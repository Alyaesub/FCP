import { Router } from "express";
import {
  getAllPhotos,
  getPhotoById,
  getPhotosByGalerieId,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from "../controllers/photo.controller";
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Routes publique
router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);
router.get("/galerie/:galerieId", getPhotosByGalerieId);

// Route protége Admin ET staff
router.post("/", authMiddleware, createPhoto);
router.put("/:id", authMiddleware, updatePhoto);
router.delete("/:id", authMiddleware, deletePhoto);

export default router;