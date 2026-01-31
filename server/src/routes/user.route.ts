// server/src/routes/user.route.ts

import { Router } from 'express';
import { registerUser, loginUser, getUsers, getUserByIdController } from '../controllers/user.controller';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

/**
 * Routes publiques
 */
router.post('/register', registerUser); 
router.post('/login', loginUser);     

/**
 * Routes protégées (admin uniquement)
 */
router.get('/users', authMiddleware, isAdmin, getUsers);              // Liste des users
router.get('/users/:id', authMiddleware, isAdmin, getUserByIdController); // User par ID

export default router;