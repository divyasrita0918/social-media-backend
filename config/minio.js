import { Client } from "minio";
import dotenv from "dotenv";

dotenv.config();

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    useSSL: false,
});

const bucketName = "posts";

const createBucket = async () => {
    try {
        const exists = await minioClient.bucketExists(bucketName);
        console.log("Bucket exists:", exists);

        if (!exists) {
            await minioClient.makeBucket(bucketName);
            console.log("Bucket created");
        }
    } catch (error) {
        console.log("Error:", error);
    }
};

createBucket();

export const uploadToMinio = async (file) => {
    const fileName = Date.now() + "-" + file.originalname;

    await minioClient.putObject(
        bucketName,
        fileName,
        file.buffer
    );

    return `http://localhost:9000/${bucketName}/${fileName}`;
};

export default minioClient;