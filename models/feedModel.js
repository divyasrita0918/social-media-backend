import pool from "../config/db.js";

export const getFeed = async (userId) => {
    const result = await pool.query(
        `SELECT
            posts.id,
            posts.content,
            posts.image_url,
            posts.created_at,
            users.username
        FROM posts
        JOIN users
        ON posts.user_id = users.id
        WHERE

        posts.user_id = $1

        OR

        posts.user_id IN (

            SELECT following_id
            FROM follows
            WHERE follower_id = $1

        )

        ORDER BY posts.created_at DESC`,
        [userId]
    );

    return result.rows;
};