import dotenv from "dotenv";
import { Queue } from "bullmq";

dotenv.config();

export const welcomeQueue = new Queue(
    "welcome-email",
    {
        connection: {
            host: "my-redis",
            port: 6379
        }
    }
);