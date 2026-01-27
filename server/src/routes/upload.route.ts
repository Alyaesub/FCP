import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();

// POST /api/upload → Upload une image sur Cloudinary
router.post("/", uploadImage);

export default router;