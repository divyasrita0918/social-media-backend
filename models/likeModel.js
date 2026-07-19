import pool from "../config/db.js";

export const createLike = async (userId, postId) => {
    const result = await pool.query(
        `INSERT INTO likes (user_id, post_id)
         VALUES ($1, $2)
         RETURNING *`,
        [userId, postId]
    );

    return result.rows[0];
};

export const removeLike = async (userId, postId) => {
    await pool.query(
        `DELETE FROM likes
         WHERE user_id = $1 AND post_id = $2`,
        [userId, postId]
    );
};

export const getLikesCount = async (postId) => {
    const result = await pool.query(
        `SELECT COUNT(*) AS total_likes
         FROM likes
         WHERE post_id = $1`,
        [postId]
    );

    return result.rows[0];
};

export const hasUserLiked = async (userId, postId) => {
    const result = await pool.query(
        `SELECT *
         FROM likes
         WHERE user_id = $1
         AND post_id = $2`,
        [userId, postId]
    );

    return result.rows[0];
};