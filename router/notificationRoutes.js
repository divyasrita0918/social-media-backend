import express from "express";
import {getNotifications, readNotification} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

notificationRouter.get("/", protect, getNotifications);
notificationRouter.put("/:id/read",protect,readNotification);

export default notificationRouter;