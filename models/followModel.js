import pool from "../config/db.js";

export const followUser = async (followerId, followingId) => {
    const result = await pool.query(
        `INSERT INTO follows (follower_id, following_id)
         VALUES ($1, $2)
         RETURNING *`,
        [followerId, followingId]
    );

    return result.rows[0];
};

export const unfollowUser = async (followerId, followingId) => {
    await pool.query(
        `DELETE FROM follows
         WHERE follower_id = $1
         AND following_id = $2`,
        [followerId, followingId]
    );
};

export const isFollowing = async (followerId, followingId) => {
    const result = await pool.query(
        `SELECT *
         FROM follows
         WHERE follower_id = $1
         AND following_id = $2`,
        [followerId, followingId]
    );

    return result.rows[0];
};

export const getFollowers = async (userId) => {
    const result = await pool.query(
        `SELECT users.id, users.username
         FROM follows
         JOIN users
         ON follows.follower_id = users.id
         WHERE follows.following_id = $1`,
        [userId]
    );

    return result.rows;
};

export const getFollowing = async (userId) => {
    const result = await pool.query(
        `SELECT users.id, users.username
         FROM follows
         JOIN users
         ON follows.following_id = users.id
         WHERE follows.follower_id = $1`,
        [userId]
    );

    return result.rows;
};