import { Request, Response } from "express";
import * as matchService from "../services/match.service";

// GET /api/matches
export const getAllMatches = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getAllMatches();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Erreur getAllMatches:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/matches/:id
export const getMatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const match = await matchService.getMatchById(parseInt(id));
    if (!match) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error("Erreur getMatchById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/matches/equipe/:equipeId
export const getMatchesByEquipeId = async (req: Request, res: Response) => {
  try {
    const { equipeId } = req.params;
    if (!equipeId) {
      return res.status(400).json({ message: "ID équipe manquant" });
    }

    const matches = await matchService.getMatchesByEquipeId(parseInt(equipeId));
    res.status(200).json(matches);
  } catch (error) {
    console.error("Erreur getMatchesByEquipeId:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/matches/passes
export const getMatchesPasses = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getMatchesPasses();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Erreur getMatchesPasses:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/matches/avenir
export const getMatchesFutur = async (req: Request, res: Response) => {
  try {
    const matches = await matchService.getMatchesFutur();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Erreur getMatchesFutur:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/matches
export const createMatch = async (req: Request, res: Response) => {
  try {
    const newMatch = await matchService.createMatch(req.body);
    res.status(201).json(newMatch);
  } catch (error) {
    console.error("Erreur createMatch:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/matches/:id
export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedMatch = await matchService.updateMatch(parseInt(id), req.body);
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error("Erreur updateMatch:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/matches/:id
export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await matchService.deleteMatch(parseInt(id));
    if (!result) {
      return res.status(404).json({ message: "Match non trouvé" });
    }

    res.status(200).json({ message: "Match supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteMatch:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};