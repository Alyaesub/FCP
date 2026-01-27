import { Router } from "express";
import {
  getAllPhotos,
  getPhotoById,
  getPhotosByGalerieId,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/photo.controller";

const router = Router();

// GET /api/photos 
router.get("/", getAllPhotos);

// GET /api/photos/:id Détail d'une photo
router.get("/:id", getPhotoById);

// GET /api/photos/galerie/:galerieId  Photos d'une galerie
router.get("/galerie/:galerieId", getPhotosByGalerieId);

// POST /api/photos 
router.post("/", createPhoto);

// PUT /api/photos/:id 
router.put("/:id", updatePhoto);

// DELETE /api/photos/:id 
router.delete("/:id", deletePhoto);

export default router;