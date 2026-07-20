import {getProfile,updateProfile} from "../models/profileModel.js";
import { uploadToMinio } from "../config/minio.js";


export const fetchProfile = async (req, res) => {
    try {
        const profile = await getProfile(req.user.id);
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { username, bio, profileImage } = req.body;
        const profile = await updateProfile(
            req.user.id,
            username,
            bio,
            profileImage
        );
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};