import { Router } from "express";
import {
  getAllEvenements,
  getEvenementById,
  getEvenementsByType,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../controllers/evenement.controller";
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Routes publique
router.get("/", getAllEvenements);
router.get("/type/:type", getEvenementsByType);
router.get("/:id", getEvenementById);

// Routes protége
router.post("/", authMiddleware, isAdmin, createEvenement);
// PUT /api/evenements/:id 
router.put("/:id", authMiddleware, isAdmin, updateEvenement);
// DELETE /api/evenements/:id
router.delete("/:id", authMiddleware, isAdmin, deleteEvenement);

export default router;