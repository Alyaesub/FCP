import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image manquante" });
    }

    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: folder || "fcprovence", // Dossier par défaut
      resource_type: "auto",
    });

    res.status(200).json({
      message: "Image uploadée avec succès",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Erreur uploadImage:", error);
    res.status(500).json({ message: "Erreur lors de l'upload" });
  }
};