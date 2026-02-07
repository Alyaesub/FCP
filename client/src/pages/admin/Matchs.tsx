import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import apiClient from '../../api/client';

interface Match {
  id: number;
  date: string;
  location: string;
  equipe_domicile_id: number;
  equipe_exterieur_id: number;
  score_domicile: number | null;
  score_exterieur: number | null;
  is_home: boolean;
  is_tournament: boolean;
  tournament_id: number | null;
}

interface Equipe {
  id: number;
  nom: string;
  logo: string | null;
}

interface MatchFormData {
  date: string;
  location: string;
  equipe_domicile_id: number;
  equipe_exterieur_id: number;
  score_domicile?: number;
  score_exterieur?: number;
  is_home: boolean;
  is_tournament: boolean;
}

const Matchs = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MatchFormData>({
    defaultValues: {
      is_home: true,
      is_tournament: false,
    },
  });

  // Surveiller les équipes sélectionnées pour éviter qu'elles soient identiques
  const equipeDomicileId = watch('equipe_domicile_id');
  const equipeExterieurId = watch('equipe_exterieur_id');

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

    loadMatches();
    loadEquipes();
  }, [navigate]);

  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des matchs:', error);
      setError('Erreur lors du chargement des matchs');
    } finally {
      setIsLoading(false);
    }
  };

  const loadEquipes = async () => {
    try {
      const response = await apiClient.get('/equipes');
      setEquipes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des équipes:', error);
    }
  };

  const onSubmit = async (data: MatchFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      // Vérifier que les équipes sont différentes
      if (data.equipe_domicile_id === data.equipe_exterieur_id) {
        setError('Les deux équipes doivent être différentes');
        return;
      }

      if (editingMatch) {
        await apiClient.put(`/matches/${editingMatch.id}`, data);
        setSuccessMessage('Match modifié avec succès !');
      } else {
        await apiClient.post('/matches', data);
        setSuccessMessage('Match créé avec succès !');
      }

      setShowModal(false);
      setEditingMatch(null);
      reset();
      loadMatches();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Erreur lors de l'enregistrement");
      } else {
        setError("Erreur lors de l'enregistrement");
      }
    }
  };

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setValue('date', match.date.slice(0, 16)); // Format datetime-local
    setValue('location', match.location);
    setValue('equipe_domicile_id', match.equipe_domicile_id);
    setValue('equipe_exterieur_id', match.equipe_exterieur_id);
    setValue('score_domicile', match.score_domicile || undefined);
    setValue('score_exterieur', match.score_exterieur || undefined);
    setValue('is_home', match.is_home);
    setValue('is_tournament', match.is_tournament);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce match ?')) {
      return;
    }

    try {
      await apiClient.delete(`/matches/${id}`);
      setSuccessMessage('Match supprimé avec succès !');
      loadMatches();
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
    setEditingMatch(null);
    reset();
  };

  const getEquipeNom = (equipeId: number) => {
    const equipe = equipes.find(e => e.id === equipeId);
    return equipe ? equipe.nom : 'Équipe inconnue';
  };

  const getEquipeLogo = (equipeId: number) => {
    const equipe = equipes.find(e => e.id === equipeId);
    return equipe?.logo;
  };

  if (isLoading) {
    return (
      <div className="matchs-content__loading">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="matchs-content">
      <h1 className="matchs-content__title">Gestion des matchs</h1>

      {/* Messages */}
      {error && (
        <div className="matchs-content__message matchs-content__message--error">
          {error}
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}
      {successMessage && (
        <div className="matchs-content__message matchs-content__message--success">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>✕</button>
        </div>
      )}

      {/* Actions */}
      <div className="matchs-content__actions">
        <button onClick={() => setShowModal(true)} className="matchs-content__add-btn">
          + Ajouter un match
        </button>
      </div>

      {/* Table */}
      <div className="matchs-content__table-container">
        <table className="matchs-content__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Équipe domicile</th>
              <th>Score</th>
              <th>Équipe extérieur</th>
              <th>Lieu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>{new Date(match.date).toLocaleString('fr-FR')}</td>
                <td>
                  <div className="matchs-content__equipe">
                    {getEquipeLogo(match.equipe_domicile_id) && (
                      <img
                        src={getEquipeLogo(match.equipe_domicile_id)!}
                        alt=""
                        className="matchs-content__equipe-logo"
                      />
                    )}
                    <span>{getEquipeNom(match.equipe_domicile_id)}</span>
                  </div>
                </td>
                <td>
                  <span className="matchs-content__score">
                    {match.score_domicile !== null && match.score_exterieur !== null
                      ? `${match.score_domicile} - ${match.score_exterieur}`
                      : 'À venir'}
                  </span>
                </td>
                <td>
                  <div className="matchs-content__equipe">
                    {getEquipeLogo(match.equipe_exterieur_id) && (
                      <img
                        src={getEquipeLogo(match.equipe_exterieur_id)!}
                        alt=""
                        className="matchs-content__equipe-logo"
                      />
                    )}
                    <span>{getEquipeNom(match.equipe_exterieur_id)}</span>
                  </div>
                </td>
                <td>{match.location}</td>
                <td>
                  <div className="matchs-content__actions-cell">
                    <button
                      onClick={() => handleEdit(match)}
                      className="matchs-content__edit-btn"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(match.id)}
                      className="matchs-content__delete-btn"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {matches.length === 0 && (
          <div className="matchs-content__empty">
            <p>Aucun match pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal Création/Modification */}
      {showModal && (
        <div className="matchs-content__modal-overlay" onClick={handleCloseModal}>
          <div className="matchs-content__modal" onClick={(e) => e.stopPropagation()}>
            <div className="matchs-content__modal-header">
              <h2>{editingMatch ? 'Modifier le match' : 'Ajouter un match'}</h2>
              <button onClick={handleCloseModal} className="matchs-content__modal-close">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="matchs-content__form">
              {/* Date */}
              <div className="matchs-content__field">
                <label htmlFor="date">Date et heure *</label>
                <input
                  id="date"
                  type="datetime-local"
                  {...register('date', {
                    required: 'La date est obligatoire',
                  })}
                />
                {errors.date && (
                  <p className="matchs-content__field-error">{errors.date.message}</p>
                )}
              </div>

              {/* Lieu */}
              <div className="matchs-content__field">
                <label htmlFor="location">Lieu *</label>
                <input
                  id="location"
                  type="text"
                  {...register('location', {
                    required: 'Le lieu est obligatoire',
                  })}
                  placeholder="Ex: Stade Municipal"
                />
                {errors.location && (
                  <p className="matchs-content__field-error">{errors.location.message}</p>
                )}
              </div>

              {/* Équipe domicile */}
              <div className="matchs-content__field">
                <label htmlFor="equipe_domicile_id">Équipe à domicile *</label>
                <select
                  id="equipe_domicile_id"
                  {...register('equipe_domicile_id', {
                    required: "L'équipe à domicile est obligatoire",
                    valueAsNumber: true,
                  })}
                >
                  <option value="">-- Sélectionner une équipe --</option>
                  {equipes.map((equipe) => (
                    <option
                      key={equipe.id}
                      value={equipe.id}
                      disabled={equipe.id === equipeExterieurId}
                    >
                      {equipe.nom}
                    </option>
                  ))}
                </select>
                {errors.equipe_domicile_id && (
                  <p className="matchs-content__field-error">
                    {errors.equipe_domicile_id.message}
                  </p>
                )}
              </div>

              {/* Équipe extérieur */}
              <div className="matchs-content__field">
                <label htmlFor="equipe_exterieur_id">Équipe à l'extérieur *</label>
                <select
                  id="equipe_exterieur_id"
                  {...register('equipe_exterieur_id', {
                    required: "L'équipe à l'extérieur est obligatoire",
                    valueAsNumber: true,
                  })}
                >
                  <option value="">-- Sélectionner une équipe --</option>
                  {equipes.map((equipe) => (
                    <option
                      key={equipe.id}
                      value={equipe.id}
                      disabled={equipe.id === equipeDomicileId}
                    >
                      {equipe.nom}
                    </option>
                  ))}
                </select>
                {errors.equipe_exterieur_id && (
                  <p className="matchs-content__field-error">
                    {errors.equipe_exterieur_id.message}
                  </p>
                )}
              </div>

              {/* Scores */}
              <div className="matchs-content__field-group">
                <div className="matchs-content__field">
                  <label htmlFor="score_domicile">Score domicile</label>
                  <input
                    id="score_domicile"
                    type="number"
                    min="0"
                    {...register('score_domicile', {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: 'Le score ne peut pas être négatif',
                      },
                    })}
                    placeholder="Ex: 3"
                  />
                  {errors.score_domicile && (
                    <p className="matchs-content__field-error">
                      {errors.score_domicile.message}
                    </p>
                  )}
                </div>

                <div className="matchs-content__field">
                  <label htmlFor="score_exterieur">Score extérieur</label>
                  <input
                    id="score_exterieur"
                    type="number"
                    min="0"
                    {...register('score_exterieur', {
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: 'Le score ne peut pas être négatif',
                      },
                    })}
                    placeholder="Ex: 1"
                  />
                  {errors.score_exterieur && (
                    <p className="matchs-content__field-error">
                      {errors.score_exterieur.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="matchs-content__field-checkbox">
                <label>
                  <input type="checkbox" {...register('is_home')} />
                  <span>Match à domicile</span>
                </label>
              </div>

              <div className="matchs-content__field-checkbox">
                <label>
                  <input type="checkbox" {...register('is_tournament')} />
                  <span>Match de tournoi</span>
                </label>
              </div>

              <div className="matchs-content__modal-actions">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="matchs-content__btn matchs-content__btn--secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="matchs-content__btn matchs-content__btn--primary"
                >
                  {editingMatch ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matchs;