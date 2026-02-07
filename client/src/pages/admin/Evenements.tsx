import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Evenement {
  id: number;
  titre: string;
  description: string | null;
  date: string;
  lieu: string | null;
  type: 'match' | 'tournoi' | 'réunion' | 'autre';
}

interface EvenementFormData {
  titre: string;
  description?: string;
  date: string;
  lieu?: string;
  type: 'match' | 'tournoi' | 'réunion' | 'autre';
}

const Evenements = () => {
  const navigate = useNavigate();
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvenement, setEditingEvenement] = useState<Evenement | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EvenementFormData>();

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

    loadEvenements();
  }, [navigate]);

  const loadEvenements = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/evenements');
      setEvenements(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
      setError('Erreur lors du chargement des événements');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: EvenementFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      if (editingEvenement) {
        // Modification
        await apiClient.put(`/evenements/${editingEvenement.id}`, data);
        setSuccessMessage('Événement modifié avec succès !');
      } else {
        // Création
        await apiClient.post('/evenements', data);
        setSuccessMessage('Événement créé avec succès !');
      }

      setShowModal(false);
      setEditingEvenement(null);
      reset();
      loadEvenements();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de l\'enregistrement');
      } else {
        setError('Erreur lors de l\'enregistrement');
      }
    }
  };

  const handleEdit = (evenement: Evenement) => {
    setEditingEvenement(evenement);
    setValue('titre', evenement.titre);
    setValue('description', evenement.description || '');
    setValue('date', evenement.date.slice(0, 16)); // Format datetime-local
    setValue('lieu', evenement.lieu || '');
    setValue('type', evenement.type);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      await apiClient.delete(`/evenements/${id}`);
      setSuccessMessage('Événement supprimé avec succès !');
      loadEvenements();
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
    setEditingEvenement(null);
    reset();
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      match: '⚽ Match',
      tournoi: '🏆 Tournoi',
      réunion: '👥 Réunion',
      autre: '📅 Autre'
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className="evenements-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="evenements-content">
      <h1 className="evenements-content__title">Gestion des événements</h1>

      {/* Messages */}
      {error && (
        <div className="evenements-content__message evenements-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="evenements-content__message evenements-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="evenements-content__actions">
        <button onClick={() => setShowModal(true)} className="evenements-content__add-btn">
          + Ajouter un événement
        </button>
      </div>

      {/* Table */}
      <div className="evenements-content__table-container">
        <table className="evenements-content__table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Type</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {evenements.map((evenement) => (
              <tr key={evenement.id}>
                <td className="evenements-content__titre">{evenement.titre}</td>
                <td>
                  <span className={`evenements-content__badge evenements-content__badge--${evenement.type}`}>
                    {getTypeLabel(evenement.type)}
                  </span>
                </td>
                <td>{new Date(evenement.date).toLocaleString('fr-FR')}</td>
                <td>{evenement.lieu || '-'}</td>
                <td>
                  <div className="evenements-content__actions-cell">
                    <button
                      onClick={() => handleEdit(evenement)}
                      className="evenements-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(evenement.id)}
                      className="evenements-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {evenements.length === 0 && (
          <div className="evenements-content__empty">
            <p>Aucun événement pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="evenements-content__modal-overlay" onClick={handleCloseModal}>
          <div className="evenements-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="evenements-content__modal-header">
              <h2>{editingEvenement ? 'Modifier l\'événement' : 'Ajouter un événement'}</h2>
              <button onClick={handleCloseModal} className="evenements-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="evenements-content__form">
              <div className="evenements-content__field">
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
                  placeholder="Titre de l'événement"
                />
                {errors.titre && (
                  <p className="evenements-content__field-error">{errors.titre.message}</p>
                )}
              </div>

              <div className="evenements-content__field">
                <label htmlFor="type">Type *</label>
                <select
                  id="type"
                  {...register('type', {
                    required: 'Le type est obligatoire',
                  })}
                >
                  <option value="match">⚽ Match</option>
                  <option value="tournoi">🏆 Tournoi</option>
                  <option value="réunion">👥 Réunion</option>
                  <option value="autre">📅 Autre</option>
                </select>
                {errors.type && (
                  <p className="evenements-content__field-error">{errors.type.message}</p>
                )}
              </div>

              <div className="evenements-content__field">
                <label htmlFor="date">Date et heure *</label>
                <input
                  id="date"
                  type="datetime-local"
                  {...register('date', {
                    required: 'La date est obligatoire',
                  })}
                />
                {errors.date && (
                  <p className="evenements-content__field-error">{errors.date.message}</p>
                )}
              </div>

              <div className="evenements-content__field">
                <label htmlFor="lieu">Lieu</label>
                <input
                  id="lieu"
                  type="text"
                  {...register('lieu')}
                  placeholder="Lieu de l'événement (optionnel)"
                />
              </div>

              <div className="evenements-content__field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={5}
                  {...register('description')}
                  placeholder="Description de l'événement (optionnel)"
                />
              </div>

              <div className="evenements-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="evenements-content__btn evenements-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="evenements-content__btn evenements-content__btn--primary"
                >
                  {editingEvenement ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evenements;