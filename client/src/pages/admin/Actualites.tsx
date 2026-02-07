import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Actualite {
  id: number;
  titre: string;
  contenu: string;
  date_publication: string;
  auteur: string | null;
}

interface ActualiteFormData {
  titre: string;
  contenu: string;
  auteur?: string;
}

const Actualites = () => {
  const navigate = useNavigate();
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingActualite, setEditingActualite] = useState<Actualite | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ActualiteFormData>();

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

    loadActualites();
  }, [navigate]);

  const loadActualites = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/actualites');
      setActualites(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
      setError('Erreur lors du chargement des actualités');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ActualiteFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      if (editingActualite) {
        // Modification
        await apiClient.put(`/actualites/${editingActualite.id}`, data);
        setSuccessMessage('Actualité modifiée avec succès !');
      } else {
        // Création
        await apiClient.post('/actualites', data);
        setSuccessMessage('Actualité créée avec succès !');
      }

      setShowModal(false);
      setEditingActualite(null);
      reset();
      loadActualites();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
      } else {
        setError('Erreur lors de l\'enregistrement');
      }
    }
  };

  const handleEdit = (actualite: Actualite) => {
    setEditingActualite(actualite);
    setValue('titre', actualite.titre);
    setValue('contenu', actualite.contenu);
    setValue('auteur', actualite.auteur || '');
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      return;
    }

    try {
      await apiClient.delete(`/actualites/${id}`);
      setSuccessMessage('Actualité supprimée avec succès !');
      loadActualites();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      } else {
        setError('Erreur lors de la suppression');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingActualite(null);
    reset();
  };

  if (isLoading) {
    return (
      <div className="actualites-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="actualites-content">
      <h1 className="actualites-content__title">Gestion des actualités</h1>

      {/* Messages */}
      {error && (
        <div className="actualites-content__message actualites-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="actualites-content__message actualites-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="actualites-content__actions">
        <button onClick={() => setShowModal(true)} className="actualites-content__add-btn">
          + Ajouter une actualité
        </button>
      </div>

      {/* Table */}
      <div className="actualites-content__table-container">
        <table className="actualites-content__table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Date de publication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actualites.map((actualite) => (
              <tr key={actualite.id}>
                <td className="actualites-content__titre">{actualite.titre}</td>
                <td>{actualite.auteur || '-'}</td>
                <td>{new Date(actualite.date_publication).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div className="actualites-content__actions-cell">
                    <button
                      onClick={() => handleEdit(actualite)}
                      className="actualites-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(actualite.id)}
                      className="actualites-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {actualites.length === 0 && (
          <div className="actualites-content__empty">
            <p>Aucune actualité pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="actualites-content__modal-overlay" onClick={handleCloseModal}>
          <div className="actualites-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="actualites-content__modal-header">
              <h2>{editingActualite ? 'Modifier l\'actualité' : 'Ajouter une actualité'}</h2>
              <button onClick={handleCloseModal} className="actualites-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="actualites-content__form">
              <div className="actualites-content__field">
                <label htmlFor="titre">Titre *</label>
                <input
                  id="titre"
                  type="text"
                  {...register('titre', {
                    required: 'Le titre est obligatoire',
                    maxLength: {
                      value: 150,
                      message: 'Le titre ne doit pas dépasser 150 caractères',
                    },
                  })}
                  placeholder="Titre de l'actualité"
                />
                {errors.titre && (
                  <p className="actualites-content__field-error">{errors.titre.message}</p>
                )}
              </div>

              <div className="actualites-content__field">
                <label htmlFor="contenu">Contenu *</label>
                <textarea
                  id="contenu"
                  rows={8}
                  {...register('contenu', {
                    required: 'Le contenu est obligatoire',
                  })}
                  placeholder="Contenu de l'actualité"
                />
                {errors.contenu && (
                  <p className="actualites-content__field-error">{errors.contenu.message}</p>
                )}
              </div>

              <div className="actualites-content__field">
                <label htmlFor="auteur">Auteur</label>
                <input
                  id="auteur"
                  type="text"
                  {...register('auteur')}
                  placeholder="Nom de l'auteur (optionnel)"
                />
              </div>

              <div className="actualites-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="actualites-content__btn actualites-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="actualites-content__btn actualites-content__btn--primary"
                >
                  {editingActualite ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actualites;