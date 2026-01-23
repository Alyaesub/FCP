import { Router } from "express";
import {
  getAllJoueurs,
  getJoueurById,
  getJoueursByEquipeId,
  createJoueur,
  updateJoueur,
  deleteJoueur,
} from "../controllers/joueur.controller";

const router = Router();

// Liste de tous les joueurs
router.get("/", getAllJoueurs);

//  Détail d'un joueur
router.get("/:id", getJoueurById);

// Tous les joueurs d'une équipe
router.get("/equipe/:equipeId", getJoueursByEquipeId);

// Créer un joueur
router.post("/", createJoueur);

//  Modifier un joueur
router.put("/:id", updateJoueur);

// Supprimer un joueur
router.delete("/:id", deleteJoueur);

export default router;