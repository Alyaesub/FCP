import { Router } from "express";
import {
  getAllGaleries,
  getGalerieById,
  getGaleriesByEquipeId,
  createGalerie,
  updateGalerie,
  deleteGalerie,
} from "../controllers/galerie.controller";

const router = Router();

// GET /api/galeries Liste de toutes les galeries
router.get("/", getAllGaleries);

// GET /api/galeries/:id  Détail d'une galeri
router.get("/:id", getGalerieById);

// GET /api/galeries/equipe/:equipeId Galeries d'une équipe
router.get("/equipe/:equipeId", getGaleriesByEquipeId);

// POST /api/galeries Créer une galerie
router.post("/", createGalerie);

// PUT /api/galeries/:id Modifier une galerie
router.put("/:id", updateGalerie);

// DELETE /api/galeries/:id 
router.delete("/:id", deleteGalerie);

export default router;