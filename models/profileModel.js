import pool from "../config/db.js";

export const getProfile = async (userId) => {
    const result = await pool.query(
        `SELECT
            id,
            username,
            email,
            bio,
            profile_image,
            created_at
        FROM users
        WHERE id = $1`,
        [userId]
    );
    return result.rows[0];
};

export const updateProfile = async (userId,username,bio,profileImage) => {
    const result = await pool.query(
        `UPDATE users
         SET
            username = $1,
            bio = $2,
            profile_image = $3,
            updated_at = CURRENT_TIMESTAMP
         WHERE id = $4
         RETURNING *`,
        [username, bio, profileImage, userId]
    );
    return result.rows[0];
};