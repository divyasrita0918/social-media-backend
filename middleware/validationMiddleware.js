import { body, validationResult } from "express-validator";

export const validateRegister = [

    body("username")
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }

];

export const validateLogin = [

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }

];

export const validatePost = [

    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ max: 500 })
        .withMessage("Content cannot exceed 500 characters"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }

];

export const validateComment = [

    body("content")
        .notEmpty()
        .withMessage("Content is required")
        .isLength({ max: 300 })
        .withMessage("Comment cannot exceed 300 characters"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }

];