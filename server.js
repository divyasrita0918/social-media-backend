import express from "express"
import dotenv from "dotenv"
import pool from "./config/db.js"
import "./config/minio.js"
import "./config/redis.js"
import "./workers/welcomeWorker.js"

import userRouter from "./router/userRoutes.js"
import postRouter from "./router/postRoutes.js"
import uploadRouter from "./router/uploadRoutes.js"
import commentRouter from "./router/commentRoutes.js"
import likeRouter from "./router/likeRoutes.js";
import profileRouter from "./router/profileRoutes.js";
import followRouter from "./router/followRoutes.js";
import feedRouter from "./router/feedRoutes.js"; 
import { errorHandler } from "./middleware/errorMiddleware.js"
import notificationRouter from "./router/notificationRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use("/api/posts",postRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/profile", profileRouter);
app.use("/api/follows", followRouter);
app.use("/api/feed", feedRouter);
app.use("/api/notifications", notificationRouter);
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});
