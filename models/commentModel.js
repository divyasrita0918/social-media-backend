import pool from "../config/db.js";

export const createComment = async (content, userId, postId) => {
    const result = await pool.query(
        `INSERT INTO comments (content, user_id, post_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [content, userId, postId]
    );

    return result.rows[0];
};

export const getCommentsByPostId = async (postId) => {

    const result = await pool.query(
        `SELECT comments.*, users.username
         FROM comments
         JOIN users
         ON comments.user_id = users.id
         WHERE post_id = $1
         ORDER BY created_at ASC`,
        [postId]
    );

    return result.rows;

};

export const getCommentById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM comments WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

export const deleteComment = async (id) => {
    await pool.query(
        "DELETE FROM comments WHERE id = $1",
        [id]
    );
};