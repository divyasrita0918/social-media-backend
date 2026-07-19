import {uploadToMinio} from "../config/minio.js";

const bucketName = "posts";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        
        const imageUrl = await uploadToMinio(req.file);
        
        res.json({
            message: "Image uploaded successfully",
            imageUrl
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Upload failed"
        });
    }
};