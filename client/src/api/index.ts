// api/index.ts
import apiClient from './client';

// ============================================
// TYPES
// ============================================

export interface Equipe {
  id: number;
  nom: string;
  slug?: string;
  categorie: string;
  description?: string;
  logo?: string;
  coach_nom?: string;
  coach_photo?: string;
  photo_equipe?: string;
  entrainements?: string;
  lieu?: string;
  type?: 'club' | 'exterieure'; 
}

export interface Joueur {
  id: number;
  nom: string;
  prenom: string;
  date_naissance?: string;
  poste?: string;
  numero?: number;
  photo?: string;
  equipe_id?: number;
}

export interface Match {
  id: number;
  date: string;
  location: string;
  equipe_domicile_id: number;
  equipe_exterieur_id: number;
  equipe_domicile_nom: string;  // Vient du JOIN SQL
  equipe_domicile_logo?: string; 
  equipe_exterieur_nom: string; // Vient du JOIN SQL
  equipe_exterieur_logo?: string;
  score_domicile?: number | null;
  score_exterieur?: number | null;
  is_home?: boolean;
  is_tournament?: boolean;
  tournament_id?: number | null;
}

export interface Evenement {
  id: number;
  titre: string;
  description?: string;
  date: string;
  lieu?: string;
  type?: string;
}

export interface Actualite {
  id: number;
  titre: string;
  contenu: string;
  image?: string;
  date: string;
}

export interface Galerie {
  id: number;
  titre: string;
  description?: string;
  date: string;
  equipe_id?: number;
}

export interface Photo {
  id: number;
  filename: string;
  description?: string;
  galerie_id: number;
  url?: string;
}

// ============================================
// API ÉQUIPES
// ============================================

export const getEquipes = async (): Promise<Equipe[]> => {
  const response = await apiClient.get('/equipes');
  return response.data;
};

export const getEquipeById = async (id: number): Promise<Equipe> => {
  const response = await apiClient.get(`/equipes/${id}`);
  return response.data;
};

// ============================================
// API JOUEURS
// ============================================

export const getJoueurs = async (): Promise<Joueur[]> => {
  const response = await apiClient.get('/joueurs');
  return response.data;
};

export const getJoueursByEquipe = async (equipeId: number): Promise<Joueur[]> => {
  const response = await apiClient.get(`/joueurs/equipe/${equipeId}`);
  return response.data;
};

// ============================================
// API MATCHS
// ============================================

export const getMatchs = async (): Promise<Match[]> => {
  const response = await apiClient.get('/matches');
  return response.data;
};

export const getMatchsPasses = async (): Promise<Match[]> => {
  const response = await apiClient.get('/matches/passes');
  return response.data;
};

export const getMatchsFutur = async (): Promise<Match[]> => {
  const response = await apiClient.get('/matches/futur');
  return response.data;
};

export const getMatchsByEquipe = async (equipeId: number): Promise<Match[]> => {
  const response = await apiClient.get(`/matches/equipe/${equipeId}`);
  return response.data;
};

// ============================================
// API ÉVÉNEMENTS
// ============================================

export const getEvenements = async (): Promise<Evenement[]> => {
  const response = await apiClient.get('/evenements');
  return response.data;
};

export const getEvenementsByType = async (type: string): Promise<Evenement[]> => {
  const response = await apiClient.get(`/evenements/type/${type}`);
  return response.data;
};

// ============================================
// API ACTUALITÉS
// ============================================

export const getActualites = async (): Promise<Actualite[]> => {
  const response = await apiClient.get('/actualites');
  return response.data;
};

export const getActualiteById = async (id: number): Promise<Actualite> => {
  const response = await apiClient.get(`/actualites/${id}`);
  return response.data;
};

// ============================================
// API GALERIES
// ============================================

export const getGaleries = async (): Promise<Galerie[]> => {
  const response = await apiClient.get('/galeries');
  return response.data;
};

export const getGalerieById = async (id: number): Promise<Galerie> => {
  const response = await apiClient.get(`/galeries/${id}`);
  return response.data;
};

export const getGaleriesByEquipe = async (equipeId: number): Promise<Galerie[]> => {
  const response = await apiClient.get(`/galeries/equipe/${equipeId}`);
  return response.data;
};

// ============================================
// API PHOTOS
// ============================================

export const getPhotos = async (): Promise<Photo[]> => {
  const response = await apiClient.get('/photos');
  return response.data;
};

export const getPhotosByGalerie = async (galerieId: number): Promise<Photo[]> => {
  const response = await apiClient.get(`/photos/galerie/${galerieId}`);
  return response.data;
};

// ============================================
// API AUTHENTIFICATION 
// ============================================

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

// ========================================
// USERS & AUTH
// ========================================

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'staff';
    created_at: string;
  };
  token: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/login', data);
  return response.data;
};

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};