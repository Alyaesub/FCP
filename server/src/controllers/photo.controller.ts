import { Request, Response } from "express";
import * as photoService from "../services/photo.service";

// GET /api/photos
export const getAllPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await photoService.getAllPhotos();
    res.status(200).json(photos);
  } catch (error) {
    console.error("Erreur getAllPhotos:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/photos/:id
export const getPhotoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const photo = await photoService.getPhotoById(parseInt(id));

    if (!photo) {
      return res.status(404).json({ message: "Photo non trouvée" });
    }

    res.status(200).json(photo);
  } catch (error) {
    console.error("Erreur getPhotoById:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/photos/galerie/:galerieId
export const getPhotosByGalerieId = async (req: Request, res: Response) => {
  try {
    const { galerieId } = req.params;

    if (!galerieId) {
      return res.status(400).json({ message: "ID galerie manquant" });
    }

    const photos = await photoService.getPhotosByGalerieId(parseInt(galerieId));
    res.status(200).json(photos);
  } catch (error) {
    console.error("Erreur getPhotosByGalerieId:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/photos
export const createPhoto = async (req: Request, res: Response) => {
  try {
    const newPhoto = await photoService.createPhoto(req.body);
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Erreur createPhoto:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/photos/:id
export const updatePhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const updatedPhoto = await photoService.updatePhoto(parseInt(id), req.body);

    if (!updatedPhoto) {
      return res.status(404).json({ message: "Photo non trouvée" });
    }

    res.status(200).json(updatedPhoto);
  } catch (error) {
    console.error("Erreur updatePhoto:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/photos/:id
export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const result = await photoService.deletePhoto(parseInt(id));

    if (!result) {
      return res.status(404).json({ message: "Photo non trouvée" });
    }

    res.status(200).json({ message: "Photo supprimée avec succès" });
  } catch (error) {
    console.error("Erreur deletePhoto:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};