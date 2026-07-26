import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { compressImage } from "../middleware/compressImageMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadRateLimit } from "../middleware/uploadRateLimitMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/",protect,uploadRateLimit, upload.single("image"), compressImage, uploadImage);

export default uploadRouter;