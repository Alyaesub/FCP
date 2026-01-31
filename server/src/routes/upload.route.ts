import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Route protégée Admin ET staff
router.post("/", authMiddleware, uploadImage);

export default router;