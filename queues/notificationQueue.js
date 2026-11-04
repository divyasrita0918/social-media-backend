import dotenv from "dotenv";
import { Queue } from "bullmq";

dotenv.config();

export const notificationQueue = new Queue(
    "notification-email",
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
);
