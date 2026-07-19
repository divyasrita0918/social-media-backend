import express from "express";
import {likePost,unlikePost,fetchLikes} from "../controllers/likeController.js";
import { protect } from "../middleware/authMiddleware.js";

const likeRouter = express.Router();

likeRouter.post("/:postId", protect, likePost);
likeRouter.delete("/:postId", protect, unlikePost);
likeRouter.get("/:postId", fetchLikes);

export default likeRouter;