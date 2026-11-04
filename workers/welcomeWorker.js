import dotenv from "dotenv";
import { Worker } from "bullmq";
import transporter from "../config/mail.js";

dotenv.config();

const baseUrl = process.env.APP_URL || "http://localhost:3000";

const worker = new Worker(
    "welcome-email",
    async (job) => {
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: job.data.email,
                subject: "Verify Your Email",
                text: `Hi ${job.data.username},

Thank you for registering.

Click the link below to verify your email:

${baseUrl}/api/users/verify/${job.data.token}`
            });

            console.log(`Welcome email sent to ${job.data.email}`);
        } catch (error) {
            console.error("Welcome Worker Error:", error);
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
);

console.log("Welcome Worker Started");
