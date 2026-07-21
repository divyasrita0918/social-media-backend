import { createClient } from "redis";

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

await redisClient.connect();

console.log("Redis Connected");

export default redisClient;