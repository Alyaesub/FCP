import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { loginUser } from '../../api';
import logo from '../../assets/logo-rond-sansBg.png';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      // Rediriger vers le dashboard si déjà connecté
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await loginUser(data);

      // Stocker le token et les infos user dans localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirection vers le dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Erreur lors de la connexion');
      } else {
        setError('Erreur lors de la connexion');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <img src={logo} alt="FC Provence" className="login__logo" />
          <h1 className="login__title">Administration</h1>
          <p className="login__subtitle">Connectez-vous pour accéder au tableau de bord</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
          {error && (
            <div className="login__error">
              <p>{error}</p>
            </div>
          )}

          <div className="login__field">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`login__input ${errors.email ? 'login__input--error' : ''}`}
              {...register('email', {
                required: 'L\'email est obligatoire',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email invalide',
                },
              })}
              placeholder="votre email"
            />
            {errors.email && (
              <p className="login__field-error">{errors.email.message}</p>
            )}
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__label">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className={`login__input ${errors.password ? 'login__input--error' : ''}`}
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
              <p className="login__field-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="login__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login__footer">
          <p>FC Provence - Administration {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;