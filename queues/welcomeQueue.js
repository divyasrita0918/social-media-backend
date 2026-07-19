import dotenv from "dotenv";
import { Queue } from "bullmq";

dotenv.config();

export const welcomeQueue = new Queue(
    "welcome-email",
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    }
);