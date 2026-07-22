import dotenv from "dotenv";
import { Worker } from "bullmq";
import transporter from "../config/mail.js";

dotenv.config();

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

                 http://20.207.111.219:3000/api/users/verify/${job.data.token}`
            });
            
            console.log(`Welcome email sent to ${job.data.email}`);

        } catch (error) {
            console.log(error);
        }
    },
    {
        connection: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    }
);

console.log("Welcome Worker Started");