import { Router } from "express";
import {
  getAllActualites,
  getActualiteById,
  createActualite,
  updateActualite,
  deleteActualite,
} from "../controllers/actualite.controller"
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router()

// Routes publique
router.get("/", getAllActualites);
router.get("/:id", getActualiteById);

// Routes protége
router.post("/", authMiddleware, isAdmin, createActualite);
router.put("/:id", authMiddleware, isAdmin, updateActualite);
router.delete("/:id", authMiddleware, isAdmin, deleteActualite);

export default router;