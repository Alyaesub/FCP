import { Router } from "express";
import {
  getAllEquipes,
  getEquipeById,
  createEquipe,
  updateEquipe,
  deleteEquipe,
} from "../controllers/equipe.controller";

const router = Router();

// Liste de toutes les équipes
router.get("/", getAllEquipes);
// Détail d'une équipe
router.get("/:id", getEquipeById);
// Créer une équipe
router.post("/", createEquipe);
// Modifier une équipe
router.put("/:id", updateEquipe);
// Supprimer une équipe
router.delete("/:id", deleteEquipe);

export default router;