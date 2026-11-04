import dotenv from "dotenv";
import { Queue } from "bullmq";

dotenv.config();

export const welcomeQueue = new Queue(
    "welcome-email",
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
);
