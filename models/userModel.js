import pool from "../config/db.js"

export const createUser = async(username, email , password,verificationToken)=>{
    const result = await pool.query(
        `INSERT INTO users (username, email, password,verification_token)
        VALUES($1, $2, $3, $4)
        RETURNING*`,
        [username,email,password,verificationToken]
    );

    return result.rows[0];
}

export const findUserByEmail = async(email)=>{
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0];
}

export const searchUsers = async (username) => {
    const result = await pool.query(
        `SELECT id, username
         FROM users
         WHERE username ILIKE $1`,
        [`%${username}%`]
    );

    return result.rows;
};

export const findUserByVerificationToken = async (token) => {
    const result = await pool.query(
        `SELECT * FROM users
         WHERE verification_token = $1`,
        [token]
    );

    return result.rows[0];
};

export const verifyUser = async (id) => {
    const result = await pool.query(
        `UPDATE users
         SET is_verified = TRUE,
             verification_token = NULL
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};

export const findUserById = async (id) => {

    const result = await pool.query(
        `SELECT id, username, email
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];
};