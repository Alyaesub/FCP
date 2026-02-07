import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Equipe {
  id: number;
  nom: string;
  slug: string;
  categorie: string | null;
  description: string | null;
  ville: string | null;
  logo: string | null;
  photo_equipe: string | null;
  entrainements: string | null;
  lieu: string | null;
  coach_nom: string | null;
  coach_photo: string | null;
  type: 'club' | 'exterieure';
  
}

interface EquipeFormData {
  nom: string;
  slug: string;
  categorie?: string;
  description?: string;
  ville?: string;
  entrainements?: string;
  lieu?: string;
  coach_nom?: string;
  type: 'club' | 'exterieure';
  logo?: string;          
  photo_equipe?: string;   
  coach_photo?: string; 
}

const Equipes = () => {
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState<Equipe | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // States pour les images
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [photoEquipePreview, setPhotoEquipePreview] = useState<string>('');
  const [coachPhotoPreview, setCoachPhotoPreview] = useState<string>('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingPhotoEquipe, setIsUploadingPhotoEquipe] = useState(false);
  const [isUploadingCoachPhoto, setIsUploadingCoachPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EquipeFormData>();

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

    loadEquipes();
  }, [navigate]);

  const loadEquipes = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/equipes');
      setEquipes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
      setError('Erreur lors du chargement des équipes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: 'logo' | 'photo_equipe' | 'coach_photo'
  ) => {
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
      // Set loading state
      if (imageType === 'logo') setIsUploadingLogo(true);
      if (imageType === 'photo_equipe') setIsUploadingPhotoEquipe(true);
      if (imageType === 'coach_photo') setIsUploadingCoachPhoto(true);

      setError('');

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;

        // Upload vers Cloudinary
        const response = await apiClient.post('/upload', {
          image: base64Image,
          folder: `equipes/${imageType}`,
        });

        // Stocker l'URL
        setValue(imageType, response.data.url);

        // Preview
        if (imageType === 'logo') setLogoPreview(response.data.url);
        if (imageType === 'photo_equipe') setPhotoEquipePreview(response.data.url);
        if (imageType === 'coach_photo') setCoachPhotoPreview(response.data.url);
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'upload");
      } else {
        setError("Erreur lors de l'upload");
      }
    } finally {
      if (imageType === 'logo') setIsUploadingLogo(false);
      if (imageType === 'photo_equipe') setIsUploadingPhotoEquipe(false);
      if (imageType === 'coach_photo') setIsUploadingCoachPhoto(false);
    }
  };

  const onSubmit = async (data: EquipeFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      const payload = {
        ...data,
        logo: logoPreview || null,
        photo_equipe: photoEquipePreview || null,
        coach_photo: coachPhotoPreview || null,
      };

      if (editingEquipe) {
        await apiClient.put(`/equipes/${editingEquipe.id}`, payload);
        setSuccessMessage('Équipe modifiée avec succès !');
      } else {
        await apiClient.post('/equipes', payload);
        setSuccessMessage('Équipe créée avec succès !');
      }

      setShowModal(false);
      setEditingEquipe(null);
      resetForm();
      loadEquipes();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'enregistrement");
      } else {
        setError("Erreur lors de l'enregistrement");
      }
    }
  };

  const handleEdit = (equipe: Equipe) => {
    setEditingEquipe(equipe);
    setValue('nom', equipe.nom);
    setValue('slug', equipe.slug);
    setValue('categorie', equipe.categorie || '');
    setValue('description', equipe.description || '');
    setValue('ville', equipe.ville || '');
    setValue('entrainements', equipe.entrainements || '');
    setValue('lieu', equipe.lieu || '');
    setValue('coach_nom', equipe.coach_nom || '');
    setValue('type', equipe.type);

    setLogoPreview(equipe.logo || '');
    setPhotoEquipePreview(equipe.photo_equipe || '');
    setCoachPhotoPreview(equipe.coach_photo || '');

    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
      return;
    }

    try {
      await apiClient.delete(`/equipes/${id}`);
      setSuccessMessage('Équipe supprimée avec succès !');
      loadEquipes();
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
    setLogoPreview('');
    setPhotoEquipePreview('');
    setCoachPhotoPreview('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEquipe(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="equipes-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="equipes-content">
      <h1 className="equipes-content__title">Gestion des équipes</h1>

      {/* Messages */}
      {error && (
        <div className="equipes-content__message equipes-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="equipes-content__message equipes-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="equipes-content__actions">
        <button onClick={() => setShowModal(true)} className="equipes-content__add-btn">
          + Ajouter une équipe
        </button>
      </div>

      {/* Table */}
      <div className="equipes-content__table-container">
        <table className="equipes-content__table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Type</th>
              <th>Coach</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipes.map((equipe) => (
              <tr key={equipe.id}>
                <td>
                  {equipe.logo ? (
                    <img
                      src={equipe.logo}
                      alt={equipe.nom}
                      className="equipes-content__thumbnail"
                    />
                  ) : (
                    <div className="equipes-content__no-image">⚽</div>
                  )}
                </td>
                <td className="equipes-content__nom">{equipe.nom}</td>
                <td>{equipe.categorie || '-'}</td>
                <td>
                  <span className={`equipes-content__badge equipes-content__badge--${equipe.type}`}>
                    {equipe.type === 'club' ? '🏠 Club' : '🆚 Extérieure'}
                  </span>
                </td>
                <td>{equipe.coach_nom || '-'}</td>
                <td>
                  <div className="equipes-content__actions-cell">
                    <button
                      onClick={() => handleEdit(equipe)}
                      className="equipes-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(equipe.id)}
                      className="equipes-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {equipes.length === 0 && (
          <div className="equipes-content__empty">
            <p>Aucune équipe pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="equipes-content__modal-overlay" onClick={handleCloseModal}>
          <div className="equipes-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="equipes-content__modal-header">
              <h2>{editingEquipe ? "Modifier l'équipe" : 'Ajouter une équipe'}</h2>
              <button onClick={handleCloseModal} className="equipes-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="equipes-content__form">
              {/* Nom */}
              <div className="equipes-content__field">
                <label htmlFor="nom">Nom de l'équipe *</label>
                <input
                  id="nom"
                  type="text"
                  {...register('nom', {
                    required: "Le nom est obligatoire",
                    maxLength: {
                      value: 100,
                      message: 'Le nom ne doit pas dépasser 100 caractères',
                    },
                  })}
                  placeholder="Ex: FC Provence U13"
                />
                {errors.nom && (
                  <p className="equipes-content__field-error">{errors.nom.message}</p>
                )}
              </div>

              {/* Slug */}
              <div className="equipes-content__field">
                <label htmlFor="slug">Slug (URL) *</label>
                <input
                  id="slug"
                  type="text"
                  {...register('slug', {
                    required: 'Le slug est obligatoire',
                    pattern: {
                      value: /^[a-z0-9-]+$/,
                      message: 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets',
                    },
                  })}
                  placeholder="Ex: u13-garcons"
                />
                {errors.slug && (
                  <p className="equipes-content__field-error">{errors.slug.message}</p>
                )}
              </div>

              {/* Type */}
              <div className="equipes-content__field">
                <label htmlFor="type">Type *</label>
                <select
                  id="type"
                  {...register('type', {
                    required: 'Le type est obligatoire',
                  })}
                >
                  <option value="club">🏠 Équipe du club</option>
                  <option value="exterieure">🆚 Équipe extérieure</option>
                </select>
                {errors.type && (
                  <p className="equipes-content__field-error">{errors.type.message}</p>
                )}
              </div>

              {/* Catégorie */}
              <div className="equipes-content__field">
                <label htmlFor="categorie">Catégorie</label>
                <input
                  id="categorie"
                  type="text"
                  {...register('categorie')}
                  placeholder="Ex: U13, Seniors, U9..."
                />
              </div>

              {/* Ville */}
              <div className="equipes-content__field">
                <label htmlFor="ville">Ville</label>
                <input
                  id="ville"
                  type="text"
                  {...register('ville')}
                  placeholder="Ex: Marseille"
                />
              </div>

              {/* Description */}
              <div className="equipes-content__field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  placeholder="Description de l'équipe"
                />
              </div>

              {/* Entraînements */}
              <div className="equipes-content__field">
                <label htmlFor="entrainements">Jours d'entraînements</label>
                <input
                  id="entrainements"
                  type="text"
                  {...register('entrainements')}
                  placeholder="Ex: Mardi et Jeudi - 18h à 19h30"
                />
              </div>

              {/* Lieu */}
              <div className="equipes-content__field">
                <label htmlFor="lieu">Lieu d'entraînement</label>
                <input
                  id="lieu"
                  type="text"
                  {...register('lieu')}
                  placeholder="Ex: Stade Municipal"
                />
              </div>

              {/* Coach */}
              <div className="equipes-content__field">
                <label htmlFor="coach_nom">Nom du coach</label>
                <input
                  id="coach_nom"
                  type="text"
                  {...register('coach_nom')}
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              {/* Logo */}
              <div className="equipes-content__field">
                <label htmlFor="logo">Logo de l'équipe</label>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  disabled={isUploadingLogo}
                />
                {isUploadingLogo && (
                  <p className="equipes-content__uploading">Upload en cours...</p>
                )}
                {logoPreview && (
                  <div className="equipes-content__image-preview">
                    <img src={logoPreview} alt="Aperçu logo" />
                  </div>
                )}
              </div>

              {/* Photo équipe */}
              <div className="equipes-content__field">
                <label htmlFor="photo_equipe">Photo de l'équipe</label>
                <input
                  id="photo_equipe"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'photo_equipe')}
                  disabled={isUploadingPhotoEquipe}
                />
                {isUploadingPhotoEquipe && (
                  <p className="equipes-content__uploading">Upload en cours...</p>
                )}
                {photoEquipePreview && (
                  <div className="equipes-content__image-preview">
                    <img src={photoEquipePreview} alt="Aperçu photo équipe" />
                  </div>
                )}
              </div>

              {/* Photo coach */}
              <div className="equipes-content__field">
                <label htmlFor="coach_photo">Photo du coach</label>
                <input
                  id="coach_photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'coach_photo')}
                  disabled={isUploadingCoachPhoto}
                />
                {isUploadingCoachPhoto && (
                  <p className="equipes-content__uploading">Upload en cours...</p>
                )}
                {coachPhotoPreview && (
                  <div className="equipes-content__image-preview">
                    <img src={coachPhotoPreview} alt="Aperçu photo coach" />
                  </div>
                )}
              </div>

              <div className="equipes-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="equipes-content__btn equipes-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="equipes-content__btn equipes-content__btn--primary"
                  disabled={isUploadingLogo || isUploadingPhotoEquipe || isUploadingCoachPhoto}
                >
                  {editingEquipe ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipes;