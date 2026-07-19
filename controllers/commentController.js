import { createComment, getCommentsByPostId, getCommentById, deleteComment } from "../models/commentModel.js";

export const createCommentController = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.id;

        const comment = await createComment(
            content,
            req.user.id,
            postId
        );

        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getCommentsController = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const deleteCommentController = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }
        if (comment.user_id !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }
        await deleteComment(commentId);
        res.json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};