import { Request, Response } from 'express';
import * as userService from '../services/user.service';

/**
 * Inscription d'un nouvel utilisateur
 * POST /api/register
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Tous les champs sont obligatoires' });
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Email invalide' });
      return;
    }

    // Validation mot de passe (min 6 caractères)
    if (password.length < 6) {
      res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    const result = await userService.register({ name, email, password, role });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      userId: result.id,
      token: result.token
    });
  } catch (error: any) {
    if (error.message === 'Cet email est déjà utilisé') {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
};

/**
 * Connexion d'un utilisateur
 * POST /api/login
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ message: 'Email et mot de passe requis' });
      return;
    }

    const result = await userService.login({ email, password });

    res.status(200).json({
      message: 'Connexion réussie',
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    if (error.message === 'Email ou mot de passe incorrect') {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
};

/**
 * Récupérer tous les utilisateurs (admin uniquement)
 * GET /api/users
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
  }
};

/**
 * Récupérer un utilisateur par ID (admin uniquement)
 * GET /api/users/:id
 */
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const idParam = req.params.id;

    if (!idParam) {
      res.status(400).json({ message: 'ID manquant' });
      return;
    }

    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }

    const user = await userService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
  }
};