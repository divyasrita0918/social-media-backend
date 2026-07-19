import {createLike,removeLike,getLikesCount,hasUserLiked} from "../models/likeModel.js";

export const likePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const existingLike = await hasUserLiked(userId, postId);

        if (existingLike) {
            return res.status(400).json({
                message: "Post already liked"
            });
        }

        const like = await createLike(userId, postId);
        res.status(201).json(like);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const unlikePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        await removeLike(userId, postId);
        res.json({
            message: "Like removed"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const fetchLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await getLikesCount(postId);
        res.json(likes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};