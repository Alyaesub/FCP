import { Request, Response } from "express";
import * as joueurService from "../services/joueur.service";

// GET /api/joueurs
export const getAllJoueurs = async (req: Request, res: Response) => {
  try {
    const joueurs = await joueurService.getAllJoueurs();
    res.status(200).json(joueurs);
  } catch (error) {
    console.error("Erreur getAllJoueurs:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/joueurs/:id
export const getJoueurById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const joueur = await joueurService.getJoueurById(parseInt(id));

    if (!joueur) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    res.status(200).json(joueur);
  } catch (error) {
    console.error("Erreur getJoueurById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/joueurs/equipe/:equipeId
export const getJoueursByEquipeId = async (req: Request, res: Response) => {
  try {
    const { equipeId } = req.params;

    if (!equipeId) {
      return res.status(400).json({ message: "ID équipe manquant" });
    }

    const joueurs = await joueurService.getJoueursByEquipeId(parseInt(equipeId));
    res.status(200).json(joueurs);
  } catch (error) {
    console.error("Erreur getJoueursByEquipeId:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/joueurs
export const createJoueur = async (req: Request, res: Response) => {
  try {
    const newJoueur = await joueurService.createJoueur(req.body);
    res.status(201).json(newJoueur);
  } catch (error) {
    console.error("Erreur createJoueur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/joueurs/:id
export const updateJoueur = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedJoueur = await joueurService.updateJoueur(parseInt(id), req.body);

    if (!updatedJoueur) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    res.status(200).json(updatedJoueur);
  } catch (error) {
    console.error("Erreur updateJoueur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/joueurs/:id
export const deleteJoueur = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await joueurService.deleteJoueur(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: "Joueur non trouvé" });
    }

    res.status(200).json({ message: "Joueur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteJoueur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};