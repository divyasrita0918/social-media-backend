import express from "express";
import {follow,unfollow,followers,following} from "../controllers/followController.js";
import { protect } from "../middleware/authMiddleware.js";

const followRouter = express.Router();

followRouter.post("/:userId", protect, follow);
followRouter.delete("/:userId", protect, unfollow);
followRouter.get("/followers/:userId", followers);
followRouter.get("/following/:userId", following);

export default followRouter;