import { Router } from "express";
import {
  getAllActualites,
  getActualiteById,
  createActualite,
  updateActualite,
  deleteActualite,
} from "../controllers/actualite.controller"

const router = Router()

// GET /api/actualites 
router.get("/", getAllActualites);

// GET /api/actualites/:id  Détail d'une actualité
router.get("/:id", getActualiteById);

// POST /api/actualites 
router.post("/", createActualite);

// PUT /api/actualites/:id 
router.put("/:id", updateActualite);

// DELETE /api/actualites/:id 
router.delete("/:id", deleteActualite);

export default router;