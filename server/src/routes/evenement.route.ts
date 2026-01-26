import { Router } from "express";
import {
  getAllEvenements,
  getEvenementById,
  getEvenementsByType,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../controllers/evenement.controller";

const router = Router();

// GET /api/evenements 
router.get("/", getAllEvenements);

// GET /api/evenements/type/:type Événements par type (match, tournoi, réunion, autre)
router.get("/type/:type", getEvenementsByType);

// GET /api/evenements/:id 
router.get("/:id", getEvenementById);

// POST /api/evenements 
router.post("/", createEvenement);

// PUT /api/evenements/:id 
router.put("/:id", updateEvenement);

// DELETE /api/evenements/:id
router.delete("/:id", deleteEvenement);

export default router;