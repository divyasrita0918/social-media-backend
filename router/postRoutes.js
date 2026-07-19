import express from "express";
import {createPost,fetchPost,editPost,removePost,searchPost} from "../controllers/postController.js"
import { protect } from "../middleware/authMiddleware.js";
import { validatePost } from "../middleware/validationMiddleware.js";

const postRouter = express.Router();

postRouter.post("/",protect,validatePost,createPost);
postRouter.get("/search", searchPost);
postRouter.get("/",fetchPost);
postRouter.put("/:id",protect,editPost);
postRouter.delete("/:id", protect, removePost);

export default postRouter;