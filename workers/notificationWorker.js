import dotenv from "dotenv";
import { Worker } from "bullmq";
import transporter from "../config/mail.js";
import { findUserById } from "../models/userModel.js";

dotenv.config();

const worker = new Worker(
    "notification-email",
    async (job) => {
        try {
            const user = await findUserById(job.data.userId);

            if (!user) {
                console.log("User not found");
                return;
            }

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "New Notification",
                text: `Hello ${user.username},

${job.data.message}

Login to your account to view it.`
            });

            console.log(`Notification email sent to ${user.email}`);
        } catch (error) {
            console.error("Notification Worker Error:", error);
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
);

console.log("Notification Worker Started");
