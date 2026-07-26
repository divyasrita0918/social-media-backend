import sharp from "sharp";

const MAX_SIZE = 1024 * 1024; 

export const compressImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        if (req.file.size <= MAX_SIZE) {
            return next();
        }

        console.log(
            `Original Size: ${(req.file.size / 1024 / 1024).toFixed(2)} MB`
        );

        let sharpImage = sharp(req.file.buffer);

        switch (req.file.mimetype) {
            case "image/jpeg":
                sharpImage = sharpImage.jpeg({
                    quality: 80,
                    mozjpeg: true,
                });
                break;

            case "image/png":
                sharpImage = sharpImage.png({
                    compressionLevel: 9,
                });
                break;

            case "image/webp":
                sharpImage = sharpImage.webp({
                    quality: 80,
                });
                break;

            default:
                return res.status(400).json({
                    message: "Unsupported image format.",
                });
        }

        const compressedBuffer = await sharpImage.toBuffer();

        req.file.buffer = compressedBuffer;
        req.file.size = compressedBuffer.length;

        console.log(
            `Compressed Size: ${(compressedBuffer.length / 1024 / 1024).toFixed(2)} MB`
        );

        next();
    } catch (error) {
        console.error("Image Compression Error:", error);

        return res.status(500).json({
            message: "Image compression failed",
        });
    }
};