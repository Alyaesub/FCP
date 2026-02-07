import { Router } from "express";
import {
  getAllGaleries,
  getGalerieById,
  getGaleriesByEquipeId,
  createGalerie,
  updateGalerie,
  deleteGalerie,
  getGaleriePhotos,  
} from "../controllers/galerie.controller";
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Route publique
router.get("/", getAllGaleries);
router.get("/:id", getGalerieById);
router.get("/equipe/:equipeId", getGaleriesByEquipeId);
router.get("/:id/photos", getGaleriePhotos);

// Routes protégé Admin ET staff
router.post("/", authMiddleware, createGalerie);
router.put("/:id", authMiddleware, updateGalerie);
router.delete("/:id", authMiddleware, deleteGalerie);

export default router;