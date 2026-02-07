import { Request, Response } from "express";
import * as galerieService from "../services/galerie.service";

// GET /api/galeries
export const getAllGaleries = async (req: Request, res: Response) => {
  try {
    const galeries = await galerieService.getAllGaleries();
    res.status(200).json(galeries);
  } catch (error) {
    console.error("Erreur getAllGaleries:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/galeries/:id
export const getGalerieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const galerie = await galerieService.getGalerieById(parseInt(id));

    if (!galerie) {
      return res.status(404).json({ message: "Galerie non trouvée" });
    }

    res.status(200).json(galerie);
  } catch (error) {
    console.error("Erreur getGalerieById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/galeries/equipe/:equipeId
export const getGaleriesByEquipeId = async (req: Request, res: Response) => {
  try {
    const { equipeId } = req.params;

    if (!equipeId) {
      return res.status(400).json({ message: "ID équipe manquant" });
    }

    const galeries = await galerieService.getGaleriesByEquipeId(parseInt(equipeId));
    res.status(200).json(galeries);
  } catch (error) {
    console.error("Erreur getGaleriesByEquipeId:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/galeries
export const createGalerie = async (req: Request, res: Response) => {
  try {
    const newGalerie = await galerieService.createGalerie(req.body);
    res.status(201).json(newGalerie);
  } catch (error) {
    console.error("Erreur createGalerie:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/galeries/:id
export const updateGalerie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedGalerie = await galerieService.updateGalerie(parseInt(id), req.body);

    if (!updatedGalerie) {
      return res.status(404).json({ message: "Galerie non trouvée" });
    }

    res.status(200).json(updatedGalerie);
  } catch (error) {
    console.error("Erreur updateGalerie:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/galeries/:id
export const deleteGalerie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await galerieService.deleteGalerie(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: "Galerie non trouvée" });
    }

    res.status(200).json({ message: "Galerie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deleteGalerie:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getGaleriePhotos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const photos = await galerieService.getPhotosByGalerieId(parseInt(id));
    res.status(200).json(photos);
  } catch (error) {
    console.error('Erreur getGaleriePhotos:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};