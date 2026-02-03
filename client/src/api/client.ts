// api/client.ts
import axios from 'axios';

// URL de ton backend (à adapter selon environnement)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Création de l'instance axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Intercepteur pour ajouter le token JWT automatiquement (pour plus tard)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si erreur 401 (non autorisé), rediriger vers login
    if (error.response?.status === 401) {
      console.error('Non autorisé - Token invalide ou expiré');
      // localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;