import express from "express";
import {fetchProfile,editProfile} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const profileRouter = express.Router();

profileRouter.get("/", protect, fetchProfile);
profileRouter.put("/", protect,upload.single("image"), editProfile);

export default profileRouter;