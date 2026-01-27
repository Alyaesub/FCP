import { Request, Response } from "express";
import * as actualiteService from "../services/actualite.service";

// GET /api/actualites
export const getAllActualites = async (req: Request, res: Response) => {
  try {
    const actualites = await actualiteService.getAllActualites();
    res.status(200).json(actualites);
  } catch (error) {
    console.error("Erreur getAllActualites:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/actualites/:id
export const getActualiteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const actualite = await actualiteService.getActualiteById(parseInt(id));

    if (!actualite) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.status(200).json(actualite);
  } catch (error) {
    console.error("Erreur getActualiteById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/actualites
export const createActualite = async (req: Request, res: Response) => {
  try {
    const newActualite = await actualiteService.createActualite(req.body);
    res.status(201).json(newActualite);
  } catch (error) {
    console.error("Erreur createActualite:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/actualites/:id
export const updateActualite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedActualite = await actualiteService.updateActualite(parseInt(id), req.body);

    if (!updatedActualite) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.status(200).json(updatedActualite);
  } catch (error) {
    console.error("Erreur updateActualite:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/actualites/:id
export const deleteActualite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await actualiteService.deleteActualite(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.status(200).json({ message: "Actualité supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteActualite:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};