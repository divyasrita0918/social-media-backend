import express from "express";
import {registerUser,loginUser,getProfile,searchUser,verifyEmail} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js";
import { validateRegister,validateLogin } from "../middleware/validationMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register",validateRegister,registerUser);
userRouter.post("/login",validateLogin,loginUser);
userRouter.get("/profile",protect,getProfile);
userRouter.get("/search", searchUser);
userRouter.get("/verify/:token", verifyEmail);

export default userRouter;
