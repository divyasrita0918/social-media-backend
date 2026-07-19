import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCommentController, getCommentsController, deleteCommentController } from "../controllers/commentController.js";
import { validateComment } from "../middleware/validationMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/:id", protect,validateComment, createCommentController);
commentRouter.get("/:id", getCommentsController);
commentRouter.delete("/:id", protect, deleteCommentController);

export default commentRouter;