import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Galerie {
  id: number;
  titre: string;
  description: string | null;
  date: string | null;
  equipe_id: number | null;
}

interface Photo {
  id: number;
  galerie_id: number;
  filename: string;
  titre: string | null;
  description: string | null;
  uploaded_at: string;
}

interface Equipe {
  id: number;
  nom: string;
}

interface GalerieFormData {
  titre: string;
  description?: string;
  date?: string;
  equipe_id?: number;
}

interface PhotoFormData {
  titre?: string;
  description?: string;
}

const Galerie = () => {
  const navigate = useNavigate();
  const [galeries, setGaleries] = useState<Galerie[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGalerieModal, setShowGalerieModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingGalerie, setEditingGalerie] = useState<Galerie | null>(null);
  const [selectedGalerieId, setSelectedGalerieId] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Upload multiple photos
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);

  const {
    register: registerGalerie,
    handleSubmit: handleSubmitGalerie,
    reset: resetGalerie,
    setValue: setValueGalerie,
    formState: { errors: errorsGalerie },
  } = useForm<GalerieFormData>();

  const {
    register: registerPhoto,
    handleSubmit: handleSubmitPhoto,
    reset: resetPhoto,
  } = useForm<PhotoFormData>();

  useEffect(() => {
    loadGaleries();
    loadEquipes();
  }, [navigate]);

  const loadGaleries = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/galeries');
      setGaleries(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des galeries:', error);
      setError('Erreur lors du chargement des galeries');
    } finally {
      setIsLoading(false);
    }
  };

  const loadEquipes = async () => {
    try {
      const response = await apiClient.get('/equipes');
      const equipesClub = response.data.filter((e: Equipe & { type: string }) => e.type === 'club');
      setEquipes(equipesClub);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
    }
  };

  const loadPhotos = async (galerieId: number) => {
    try {
      const response = await apiClient.get(`/galeries/${galerieId}/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
    }
  };

  // GALERIES
  const onSubmitGalerie = async (data: GalerieFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      const payload = {
        ...data,
        equipe_id: data.equipe_id || null,  // Si vide ou undefined → null
      };

      if (editingGalerie) {
        await apiClient.put(`/galeries/${editingGalerie.id}`, payload);
        setSuccessMessage('Galerie modifiée avec succès !');
      } else {
        await apiClient.post('/galeries', payload);
        setSuccessMessage('Galerie créée avec succès !');
      }

      setShowGalerieModal(false);
      setEditingGalerie(null);
      resetGalerie();
      loadGaleries();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'enregistrement");
      } else {
        setError("Erreur lors de l'enregistrement");
      }
    }
  };

  const handleEditGalerie = (galerie: Galerie) => {
    setEditingGalerie(galerie);
    setValueGalerie('titre', galerie.titre);
    setValueGalerie('description', galerie.description || '');
    setValueGalerie('date', galerie.date ? galerie.date.slice(0, 16) : '');
    setValueGalerie('equipe_id', galerie.equipe_id || undefined);
    setShowGalerieModal(true);
  };

  const handleDeleteGalerie = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette galerie et toutes ses photos ?')) {
      return;
    }

    try {
      await apiClient.delete(`/galeries/${id}`);
      setSuccessMessage('Galerie supprimée avec succès !');
      loadGaleries();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      } else {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleCloseGalerieModal = () => {
    setShowGalerieModal(false);
    setEditingGalerie(null);
    resetGalerie();
  };

  // PHOTOS
  const handleOpenPhotoModal = (galerieId: number) => {
    setSelectedGalerieId(galerieId);
    loadPhotos(galerieId);
    setShowPhotoModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Vérifier que ce sont des images
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      setError('Certains fichiers ne sont pas des images valides');
    }
    
    setSelectedFiles(validFiles);
  };

  const onSubmitPhoto = async (data: PhotoFormData) => {
    if (!selectedGalerieId) return;
    if (selectedFiles.length === 0) {
      setError('Veuillez sélectionner au moins une photo');
      return;
    }

    try {
      setIsUploadingPhotos(true);
      setError('');
      setSuccessMessage('');

      // Upload chaque photo
      for (const file of selectedFiles) {
        // Convertir en base64
        const base64Image = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => resolve(reader.result as string);
        });

        // Upload vers Cloudinary
        const uploadResponse = await apiClient.post('/upload', {
          image: base64Image,
          folder: 'galeries',
        });

        // Créer la photo en BDD
        await apiClient.post('/photos', {
          galerie_id: selectedGalerieId,
          filename: uploadResponse.data.url,
          titre: data.titre || file.name,
          description: data.description || null,
        });
      }

      setSuccessMessage(`${selectedFiles.length} photo(s) ajoutée(s) avec succès !`);
      setSelectedFiles([]);
      resetPhoto();
      loadPhotos(selectedGalerieId);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'upload");
      } else {
        setError("Erreur lors de l'upload");
      }
    } finally {
      setIsUploadingPhotos(false);
    }
  };

  const handleDeletePhoto = async (photoId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      return;
    }

    try {
      await apiClient.delete(`/photos/${photoId}`);
      setSuccessMessage('Photo supprimée avec succès !');
      if (selectedGalerieId) {
        loadPhotos(selectedGalerieId);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      } else {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleClosePhotoModal = () => {
    setShowPhotoModal(false);
    setSelectedGalerieId(null);
    setPhotos([]);
    setSelectedFiles([]);
    resetPhoto();
  };

  const getEquipeNom = (equipeId: number | null) => {
    if (!equipeId) return '-';
    const equipe = equipes.find(e => e.id === equipeId);
    return equipe ? equipe.nom : '-';
  };

  if (isLoading) {
    return (
      <div className="galerie-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="galerie-content">
      <h1 className="galerie-content__title">Gestion de la galerie</h1>

      {/* Messages */}
      {error && (
        <div className="galerie-content__message galerie-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="galerie-content__message galerie-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="galerie-content__actions">
        <button onClick={() => setShowGalerieModal(true)} className="galerie-content__add-btn">
          + Créer une galerie
        </button>
      </div>

      {/* Table Galeries */}
      <div className="galerie-content__table-container">
        <table className="galerie-content__table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Équipe</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {galeries.map((galerie) => (
              <tr key={galerie.id}>
                <td className="galerie-content__titre">{galerie.titre}</td>
                <td>{getEquipeNom(galerie.equipe_id)}</td>
                <td>
                  {galerie.date
                    ? new Date(galerie.date).toLocaleDateString('fr-FR')
                    : '-'}
                </td>
                <td>
                  <div className="galerie-content__actions-cell">
                    <button
                      onClick={() => handleOpenPhotoModal(galerie.id)}
                      className="galerie-content__photos-btn"
                    >
                      📸 Photos
                    </button>
                    <button
                      onClick={() => handleEditGalerie(galerie)}
                      className="galerie-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteGalerie(galerie.id)}
                      className="galerie-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {galeries.length === 0 && (
          <div className="galerie-content__empty">
            <p>Aucune galerie pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Galerie */}
      {showGalerieModal && (
        <div className="galerie-content__modal-overlay" onClick={handleCloseGalerieModal}>
          <div className="galerie-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="galerie-content__modal-header">
              <h2>{editingGalerie ? 'Modifier la galerie' : 'Créer une galerie'}</h2>
              <button onClick={handleCloseGalerieModal} className="galerie-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitGalerie(onSubmitGalerie)} className="galerie-content__form">
              <div className="galerie-content__field">
                <label htmlFor="titre">Titre *</label>
                <input
                  id="titre"
                  type="text"
                  {...registerGalerie('titre', {
                    required: 'Le titre est obligatoire',
                  })}
                  placeholder="Ex: Match contre Marseille"
                />
                {errorsGalerie.titre && (
                  <p className="galerie-content__field-error">{errorsGalerie.titre.message}</p>
                )}
              </div>

              <div className="galerie-content__field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  {...registerGalerie('description')}
                  placeholder="Description de la galerie"
                />
              </div>

              <div className="galerie-content__field">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="datetime-local"
                  {...registerGalerie('date')}
                />
              </div>

              <div className="galerie-content__field">
                <label htmlFor="equipe_id">Équipe</label>
                <select id="equipe_id" {...registerGalerie('equipe_id')}>
                  <option value="">-- Aucune équipe --</option>
                  {equipes.map((equipe) => (
                    <option key={equipe.id} value={equipe.id}>
                      {equipe.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="galerie-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseGalerieModal}
                  className="galerie-content__btn galerie-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="galerie-content__btn galerie-content__btn--primary"
                >
                  {editingGalerie ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Photos */}
      {showPhotoModal && (
        <div className="galerie-content__modal-overlay" onClick={handleClosePhotoModal}>
          <div className="galerie-content__modal galerie-content__modal--large" onClick={(e) => e.stopPropagation()}>
            <div className="galerie-content__modal-header">
              <h2>📸 Gérer les photos</h2>
              <button onClick={handleClosePhotoModal} className="galerie-content__modal-close">
                ✕
              </button>
            </div>

            <div className="galerie-content__photos-section">
              {/* Formulaire upload */}
              <form onSubmit={handleSubmitPhoto(onSubmitPhoto)} className="galerie-content__upload-form">
                <div className="galerie-content__field">
                  <label htmlFor="photos">Sélectionner des photos *</label>
                  <input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    disabled={isUploadingPhotos}
                  />
                  {selectedFiles.length > 0 && (
                    <p className="galerie-content__file-count">
                      {selectedFiles.length} fichier(s) sélectionné(s)
                    </p>
                  )}
                </div>

                <div className="galerie-content__field">
                  <label htmlFor="titre_photo">Titre (optionnel)</label>
                  <input
                    id="titre_photo"
                    type="text"
                    {...registerPhoto('titre')}
                    placeholder="Titre des photos"
                  />
                </div>

                <div className="galerie-content__field">
                  <label htmlFor="description_photo">Description (optionnelle)</label>
                  <textarea
                    id="description_photo"
                    rows={3}
                    {...registerPhoto('description')}
                    placeholder="Description des photos"
                  />
                </div>

                <button
                  type="submit"
                  className="galerie-content__btn galerie-content__btn--primary"
                  disabled={isUploadingPhotos || selectedFiles.length === 0}
                >
                  {isUploadingPhotos ? '⏳ Upload en cours...' : '📤 Ajouter les photos'}
                </button>
              </form>

              {/* Grid photos */}
              <div className="galerie-content__photos-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="galerie-content__photo-card">
                    <img src={photo.filename} alt={photo.titre || 'Photo'} />
                    <div className="galerie-content__photo-info">
                      <p className="galerie-content__photo-title">{photo.titre || 'Sans titre'}</p>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="galerie-content__photo-delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {photos.length === 0 && (
                <div className="galerie-content__empty">
                  <p>Aucune photo pour le moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galerie;