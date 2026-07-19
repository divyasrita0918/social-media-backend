import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "../controllers/uploadController.js";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("image"), uploadImage);

export default uploadRouter;