// server/src/utils/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * Interface pour les données du token JWT défini la structure de ce qu'on met dans le token
 */
interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Étend l'interface Request pour ajouter la propriété user
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware d'authentification JWT
 * Vérifie le token dans le header Authorization
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Token manquant' });
      return;
    }

    // Format attendu : "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token invalide' });
      return;
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Attacher les infos utilisateur à la requête
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

/**
 * Middleware pour vérifier que l'utilisateur est admin
 */
export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ message: 'Accès refusé : droits admin requis' });
    return;
  }
  next();
};