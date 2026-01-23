import { Router } from "express";
import {
  getAllEquipes,
  getEquipeById,
  createEquipe,
  updateEquipe,
  deleteEquipe,
} from "../controllers/equipe.controller";

const router = Router();

// GET /api/equipes  Liste de toutes les équipes
router.get("/", getAllEquipes);

// GET /api/equipes/:id Détail d'une équipe
router.get("/:id", getEquipeById);

// POST /api/equipes  Créer une équipe
router.post("/", createEquipe);

// PUT /api/equipes/:id  Modifier une équipe
router.put("/:id", updateEquipe);

// DELETE /api/equipes/:id  Supprimer une équipe
router.delete("/:id", deleteEquipe);

export default router;