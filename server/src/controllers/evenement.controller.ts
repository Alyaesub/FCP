import { Request, Response } from "express";
import * as evenementService from "../services/evenement.service";

// GET /api/evenements
export const getAllEvenements = async (req: Request, res: Response) => {
  try {
    const evenements = await evenementService.getAllEvenements();
    res.status(200).json(evenements);
  } catch (error) {
    console.error("Erreur getAllEvenements:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/evenements/:id
export const getEvenementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const evenement = await evenementService.getEvenementById(parseInt(id));

    if (!evenement) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.status(200).json(evenement);
  } catch (error) {
    console.error("Erreur getEvenementById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/evenements/type/:type
export const getEvenementsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    if (!type) {
      return res.status(400).json({ message: "Type manquant" });
    }

    const evenements = await evenementService.getEvenementsByType(type);
    res.status(200).json(evenements);
  } catch (error) {
    console.error("Erreur getEvenementsByType:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/evenements
export const createEvenement = async (req: Request, res: Response) => {
  try {
    const newEvenement = await evenementService.createEvenement(req.body);
    res.status(201).json(newEvenement);
  } catch (error) {
    console.error("Erreur createEvenement:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/evenements/:id
export const updateEvenement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedEvenement = await evenementService.updateEvenement(parseInt(id), req.body);

    if (!updatedEvenement) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.status(200).json(updatedEvenement);
  } catch (error) {
    console.error("Erreur updateEvenement:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/evenements/:id
export const deleteEvenement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await evenementService.deleteEvenement(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: "Événement non trouvé" });
    }

    res.status(200).json({ message: "Événement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteEvenement:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};