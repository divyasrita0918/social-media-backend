import pool from "../config/db.js";

export const createPost = async(userId, content,imageUrl)=>{
    const result = await pool.query(
        `INSERT INTO posts (user_id, content, image_url)
        VALUES ($1, $2, $3)
        RETURNING*`,
        [userId,content,imageUrl]
    );

    return result.rows[0];
};

export const getAllPosts = async (limit, offset) => {

    const result = await pool.query(
        `SELECT
            posts.id,
            users.username,
            posts.content,
            posts.image_url,
            posts.created_at
        FROM posts
        JOIN users
        ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
        LIMIT $1
        OFFSET $2`,
        [limit, offset]
    );

    return result.rows;
};

export const getPostById = async (id) => {

    const result = await pool.query(
        "SELECT * FROM posts WHERE id = $1",
        [id]
    );

    return result.rows[0];

};

export const updatePost = async (id, content) => {

    const result = await pool.query(
        `UPDATE posts
         SET content = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [content, id]
    );

    return result.rows[0];

};

export const deletePost = async (id) => {

    await pool.query(
        "DELETE FROM posts WHERE id = $1",
        [id]
    );

};

export const searchPosts = async (content) => {

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
        WHERE posts.content ILIKE $1
        ORDER BY posts.created_at DESC`,
        [`%${content}%`]
    );

    return result.rows;

};

export const getTotalPosts = async () => {

    const result = await pool.query(
        `SELECT COUNT(*) FROM posts`
    );

    return Number(result.rows[0].count);

};