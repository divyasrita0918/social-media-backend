import redisClient from "../config/redis.js";

const MAX_UPLOADS = 5;
const WINDOW = 60 * 60; 

export const uploadRateLimit = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const key = `upload:${userId}`;

        const uploads = await redisClient.get(key);

        if (!uploads) {
            await redisClient.set(key, 1, {
                EX: WINDOW,
            });

            return next();
        }

        if (Number(uploads) >= MAX_UPLOADS) {
            return res.status(429).json({
                message: "Upload limit exceeded. Try again after one hour.",
            });
        }

        await redisClient.incr(key);

        next();
    } catch (error) {
        console.error("Upload Rate Limit Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};