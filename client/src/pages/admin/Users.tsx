import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { getUsers } from '../../api';
import apiClient from '../../api/client';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  created_at: string;
}

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>();

  useEffect(() => {
    // Récupérer l'utilisateur connecté
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setCurrentUser(user);
      
      // Vérifier que c'est un admin
      if (user.role !== 'admin') {
        navigate('/admin/dashboard');
        return;
      }
    }

    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      setError('');
      setSuccessMessage('');

      await apiClient.post('/register', {
        ...data,
        role: 'staff', // Toujours créer un staff
      });

      setSuccessMessage('Staff créé avec succès !');
      setShowModal(false);
      reset();
      loadUsers(); // Recharger la liste
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la création');
      } else {
        setError('Erreur lors de la création');
      }
    }
  };

  const handleDelete = async (userId: number, userRole: string) => {
    if (userRole === 'admin') {
      alert('Impossible de supprimer un administrateur');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await apiClient.delete(`/users/${userId}`);
      setSuccessMessage('Utilisateur supprimé avec succès !');
      loadUsers(); // Recharger la liste
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      } else {
        setError('Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="users">
        <div className="users__loading">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users">
      <div className="users__container">
        {/* Header */}
        <div className="users__header">
          <div>
            <h1 className="users__title">Gestion des utilisateurs</h1>
            <p className="users__subtitle">
              Bienvenue, <strong>{currentUser?.name}</strong>
            </p>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="users__message users__message--error">
            {error}
            <button onClick={() => setError('')}>✕</button>
          </div>
        )}
        {successMessage && (
          <div className="users__message users__message--success">
            {successMessage}
            <button onClick={() => setSuccessMessage('')}>✕</button>
          </div>
        )}

        {/* Actions */}
        <div className="users__actions">
          <button onClick={() => setShowModal(true)} className="users__add-btn">
            + Ajouter un staff
          </button>
        </div>

        {/* Table */}
        <div className="users__table-container">
          <table className="users__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`users__badge users__badge--${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id, user.role)}
                      className="users__delete-btn"
                      disabled={user.role === 'admin'}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Création Staff */}
        {showModal && (
          <div className="users__modal-overlay" onClick={() => setShowModal(false)}>
            <div className="users__modal" onClick={(e) => e.stopPropagation()}>
              <div className="users__modal-header">
                <h2>Ajouter un staff</h2>
                <button onClick={() => setShowModal(false)} className="users__modal-close">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="users__form">
                <div className="users__field">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Le nom est obligatoire',
                    })}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="users__field-error">{errors.name.message}</p>
                  )}
                </div>

                <div className="users__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'L\'email est obligatoire',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Email invalide',
                      },
                    })}
                    placeholder="john@fcprovence.fr"
                  />
                  {errors.email && (
                    <p className="users__field-error">{errors.email.message}</p>
                  )}
                </div>

                <div className="users__field">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    {...register('password', {
                      required: 'Le mot de passe est obligatoire',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères',
                      },
                    })}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="users__field-error">{errors.password.message}</p>
                  )}
                </div>

                <div className="users__modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="users__btn users__btn--secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="users__btn users__btn--primary">
                    Créer le staff
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;