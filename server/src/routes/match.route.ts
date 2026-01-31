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
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Routes publique
router.get("/", getAllMatches);
router.get("/passes", getMatchesPasses);
router.get("/futur", getMatchesFutur);
router.get("/:id", getMatchById);
router.get("/equipe/:equipeId", getMatchesByEquipeId);

// Routes protégé
router.post("/", authMiddleware, isAdmin, createMatch);
router.put("/:id", authMiddleware, isAdmin, updateMatch);
router.delete("/:id", authMiddleware, isAdmin, deleteMatch);

export default router;