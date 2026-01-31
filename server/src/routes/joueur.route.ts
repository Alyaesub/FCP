import { Router } from "express";
import {
  getAllJoueurs,
  getJoueurById,
  getJoueursByEquipeId,
  createJoueur,
  updateJoueur,
  deleteJoueur,
} from "../controllers/joueur.controller";
import { authMiddleware} from '../middlewares/authMiddleware';


const router = Router();

// Routes publique
router.get("/", getAllJoueurs);
router.get("/:id", getJoueurById);
router.get("/equipe/:equipeId", getJoueursByEquipeId);

// Routes protégé admin ET staff
router.post("/", authMiddleware, createJoueur);
router.put("/:id", authMiddleware, updateJoueur);
router.delete("/:id", authMiddleware, deleteJoueur);

export default router;