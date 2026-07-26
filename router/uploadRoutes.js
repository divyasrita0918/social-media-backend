import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";
import { compressImage } from "../middleware/compressImageMiddleware.js";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), compressImage, uploadImage);

export default uploadRouter;