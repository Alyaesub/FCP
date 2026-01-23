import { Request, Response } from "express";
import * as equipeService from "../services/equipe.service";

// GET /api/equipes
export const getAllEquipes = async (req: Request, res: Response) => {
  try {
    const equipes = await equipeService.getAllEquipes();
    res.status(200).json(equipes);
  } catch (error) {
    console.error("Erreur getAllEquipes:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/equipes/:id
export const getEquipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "ID manquant" });
    }

    const equipe = await equipeService.getEquipeById(parseInt(id));
    if (!equipe) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    res.status(200).json(equipe);
  } catch (error) {
    console.error("Erreur getEquipeById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/equipes
export const createEquipe = async (req: Request, res: Response) => {
  try {
    const newEquipe = await equipeService.createEquipe(req.body);
    res.status(201).json(newEquipe);
  } catch (error) {
    console.error("Erreur createEquipe:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/equipes/:id
export const updateEquipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "ID manquant" });
    }

    const updatedEquipe = await equipeService.updateEquipe(parseInt(id), req.body);
    if (!updatedEquipe) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    res.status(200).json(updatedEquipe);
  } catch (error) {
    console.error("Erreur updateEquipe:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/equipes/:id
export const deleteEquipe = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    if (!id) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    const result = await equipeService.deleteEquipe(parseInt(id));
    if (!result) {
      return res.status(404).json({ message: "Équipe non trouvée" });
    }

    res.status(200).json({ message: "Équipe supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteEquipe:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};