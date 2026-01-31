import { Router } from "express";
import {
  getAllEquipes,
  getEquipeById,
  createEquipe,
  updateEquipe,
  deleteEquipe,
} from "../controllers/equipe.controller";
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Routes publique 
router.get("/", getAllEquipes);
router.get("/:id", getEquipeById);

// Routes protégé
router.post("/", authMiddleware, isAdmin, createEquipe);
router.put("/:id", authMiddleware, isAdmin, updateEquipe);
router.delete("/:id", authMiddleware, isAdmin, deleteEquipe);

export default router;