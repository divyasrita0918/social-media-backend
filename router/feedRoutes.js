import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { fetchFeed } from "../controllers/feedController.js";

const feedRouter = express.Router();

feedRouter.get("/", protect, fetchFeed);

export default feedRouter;