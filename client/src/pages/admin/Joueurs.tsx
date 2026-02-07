import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Joueur {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: string | null;
  poste: string | null;
  numero: number | null;
  photo: string | null;
  equipe_id: number | null;
}

interface Equipe {
  id: number;
  nom: string;
  type: string;
}

interface JoueurFormData {
  nom: string;
  prenom: string;
  date_naissance?: string;
  poste?: string;
  numero?: number;
  equipe_id?: number;
  photo?: string;
}

const Joueurs = () => {
  const navigate = useNavigate();
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJoueur, setEditingJoueur] = useState<Joueur | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // States pour l'image
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<JoueurFormData>();

  useEffect(() => {
    // Vérifier que l'utilisateur est admin
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.role !== 'admin') {
        navigate('/admin/dashboard');
        return;
      }
    }

    loadJoueurs();
    loadEquipes();
  }, [navigate]);

  const loadJoueurs = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/joueurs');
      setJoueurs(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des joueurs:', error);
      setError('Erreur lors du chargement des joueurs');
    } finally {
      setIsLoading(false);
    }
  };

  const loadEquipes = async () => {
    try {
      const response = await apiClient.get('/equipes');
      // Filtrer uniquement les équipes du club
      const equipesClub = response.data.filter((e: Equipe) => e.type === 'club');
      setEquipes(equipesClub);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    try {
      setIsUploadingPhoto(true);
      setError('');

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        // Upload vers Cloudinary
        const response = await apiClient.post('/upload', {
          image: base64Image,
          folder: 'joueurs',
        });

        // Stocker l'URL
        setValue('photo', response.data.url);
        setPhotoPreview(response.data.url);
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'upload");
      } else {
        setError("Erreur lors de l'upload");
      }
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const onSubmit = async (data: JoueurFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      const payload = {
        ...data,
        photo: photoPreview || null,
      };

      if (editingJoueur) {
        await apiClient.put(`/joueurs/${editingJoueur.id}`, payload);
        setSuccessMessage('Joueur modifié avec succès !');
      } else {
        await apiClient.post('/joueurs', payload);
        setSuccessMessage('Joueur créé avec succès !');
      }

      setShowModal(false);
      setEditingJoueur(null);
      resetForm();
      loadJoueurs();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'enregistrement");
      } else {
        setError("Erreur lors de l'enregistrement");
      }
    }
  };

  const handleEdit = (joueur: Joueur) => {
    setEditingJoueur(joueur);
    setValue('nom', joueur.nom);
    setValue('prenom', joueur.prenom);
    setValue('date_naissance', joueur.date_naissance || '');
    setValue('poste', joueur.poste || '');
    setValue('numero', joueur.numero || undefined);
    setValue('equipe_id', joueur.equipe_id || undefined);
    setPhotoPreview(joueur.photo || '');
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      return;
    }

    try {
      await apiClient.delete(`/joueurs/${id}`);
      setSuccessMessage('Joueur supprimé avec succès !');
      loadJoueurs();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      } else {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const resetForm = () => {
    reset();
    setPhotoPreview('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJoueur(null);
    resetForm();
  };

  const getEquipeNom = (equipeId: number | null) => {
    if (!equipeId) return '-';
    const equipe = equipes.find(e => e.id === equipeId);
    return equipe ? equipe.nom : '-';
  };

  if (isLoading) {
    return (
      <div className="joueurs-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="joueurs-content">
      <h1 className="joueurs-content__title">Gestion des joueurs</h1>

      {/* Messages */}
      {error && (
        <div className="joueurs-content__message joueurs-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="joueurs-content__message joueurs-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="joueurs-content__actions">
        <button onClick={() => setShowModal(true)} className="joueurs-content__add-btn">
          + Ajouter un joueur
        </button>
      </div>

      {/* Table */}
      <div className="joueurs-content__table-container">
        <table className="joueurs-content__table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>N°</th>
              <th>Poste</th>
              <th>Équipe</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {joueurs.map((joueur) => (
              <tr key={joueur.id}>
                <td>
                  {joueur.photo ? (
                    <img
                      src={joueur.photo}
                      alt={`${joueur.prenom} ${joueur.nom}`}
                      className="joueurs-content__thumbnail"
                    />
                  ) : (
                    <div className="joueurs-content__no-image">👤</div>
                  )}
                </td>
                <td className="joueurs-content__nom">{joueur.nom}</td>
                <td>{joueur.prenom}</td>
                <td>
                  {joueur.numero ? (
                    <span className="joueurs-content__numero">{joueur.numero}</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>{joueur.poste || '-'}</td>
                <td>{getEquipeNom(joueur.equipe_id)}</td>
                <td>
                  <div className="joueurs-content__actions-cell">
                    <button
                      onClick={() => handleEdit(joueur)}
                      className="joueurs-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(joueur.id)}
                      className="joueurs-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {joueurs.length === 0 && (
          <div className="joueurs-content__empty">
            <p>Aucun joueur pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="joueurs-content__modal-overlay" onClick={handleCloseModal}>
          <div className="joueurs-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="joueurs-content__modal-header">
              <h2>{editingJoueur ? 'Modifier le joueur' : 'Ajouter un joueur'}</h2>
              <button onClick={handleCloseModal} className="joueurs-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="joueurs-content__form">
              {/* Nom */}
              <div className="joueurs-content__field">
                <label htmlFor="nom">Nom *</label>
                <input
                  id="nom"
                  type="text"
                  {...register('nom', {
                    required: 'Le nom est obligatoire',
                    maxLength: {
                      value: 100,
                      message: 'Le nom ne doit pas dépasser 100 caractères',
                    },
                  })}
                  placeholder="Ex: Dupont"
                />
                {errors.nom && (
                  <p className="joueurs-content__field-error">{errors.nom.message}</p>
                )}
              </div>

              {/* Prénom */}
              <div className="joueurs-content__field">
                <label htmlFor="prenom">Prénom *</label>
                <input
                  id="prenom"
                  type="text"
                  {...register('prenom', {
                    required: 'Le prénom est obligatoire',
                    maxLength: {
                      value: 100,
                      message: 'Le prénom ne doit pas dépasser 100 caractères',
                    },
                  })}
                  placeholder="Ex: Jean"
                />
                {errors.prenom && (
                  <p className="joueurs-content__field-error">{errors.prenom.message}</p>
                )}
              </div>

              {/* Date de naissance */}
              <div className="joueurs-content__field">
                <label htmlFor="date_naissance">Date de naissance</label>
                <input
                  id="date_naissance"
                  type="date"
                  {...register('date_naissance')}
                />
              </div>

              {/* Numéro */}
              <div className="joueurs-content__field">
                <label htmlFor="numero">Numéro de maillot</label>
                <input
                  id="numero"
                  type="number"
                  min="1"
                  max="99"
                  {...register('numero', {
                    min: {
                      value: 1,
                      message: 'Le numéro doit être entre 1 et 99',
                    },
                    max: {
                      value: 99,
                      message: 'Le numéro doit être entre 1 et 99',
                    },
                  })}
                  placeholder="Ex: 10"
                />
                {errors.numero && (
                  <p className="joueurs-content__field-error">{errors.numero.message}</p>
                )}
              </div>

              {/* Poste */}
              <div className="joueurs-content__field">
                <label htmlFor="poste">Poste</label>
                <select id="poste" {...register('poste')}>
                  <option value="">-- Sélectionner un poste --</option>
                  <option value="Gardien">Gardien</option>
                  <option value="Défenseur">Défenseur</option>
                  <option value="Milieu">Milieu</option>
                  <option value="Attaquant">Attaquant</option>
                </select>
              </div>

              {/* Équipe */}
              <div className="joueurs-content__field">
                <label htmlFor="equipe_id">Équipe</label>
                <select id="equipe_id" {...register('equipe_id')}>
                  <option value="">-- Sélectionner une équipe --</option>
                  {equipes.map((equipe) => (
                    <option key={equipe.id} value={equipe.id}>
                      {equipe.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo */}
              <div className="joueurs-content__field">
                <label htmlFor="photo">Photo du joueur</label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingPhoto}
                />
                {isUploadingPhoto && (
                  <p className="joueurs-content__uploading">Upload en cours...</p>
                )}
                {photoPreview && (
                  <div className="joueurs-content__image-preview">
                    <img src={photoPreview} alt="Aperçu" />
                  </div>
                )}
              </div>

              <div className="joueurs-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="joueurs-content__btn joueurs-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="joueurs-content__btn joueurs-content__btn--primary"
                  disabled={isUploadingPhoto}
                >
                  {editingJoueur ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Joueurs;