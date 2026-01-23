import { Router } from "express";
import {
  getAllMatches,
  getMatchById,
  getMatchesByEquipeId,
  getMatchesPasses,
  getMatchesFutur,
  createMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/match.controller";

const router = Router();

//Liste de tous les matchs
router.get("/", getAllMatches);

// Matchs passés (avec scores)
router.get("/passes", getMatchesPasses);

// Matchs à venir (sans scores)
router.get("/futur", getMatchesFutur);

// Détail d'un match
router.get("/:id", getMatchById);

//  Matchs d'une équipe
router.get("/equipe/:equipeId", getMatchesByEquipeId);

// Créer un match
router.post("/", createMatch);

// PModifier un match
router.put("/:id", updateMatch);

// Supprimer un match
router.delete("/:id", deleteMatch);

export default router;