import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser,findUserByEmail,searchUsers, findUserByVerificationToken,verifyUser} from "../models/userModel.js";
import { welcomeQueue } from "../queues/welcomeQueue.js";
import crypto from "crypto";

export const registerUser = async(req,res,next)=>{
    try{

        const verificationToken = crypto.randomUUID();
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await createUser(username, email, hashedPassword,verificationToken);
        await welcomeQueue.add(
            "send-welcome-email",
            {
                email: user.email,
                username: user.username,
                token: verificationToken
            }
);
        res.status(201).json({
            message: "user registered successfully",
            user
        });

    } catch(error){

        next(error);
    }
};

export const loginUser = async(req,res)=>{
    try{
        const{email, password} = req.body;
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "invalid password"
            });
        }

        if (!user.is_verified) {
            return res.status(403).json({
                 message: "Please verify your email before logging in."
            });
        }
        const token = jwt.sign(
            {
             id: user.id,
             username: user.username
            },
             process.env.JWT_SECRET,
            {
               expiresIn: "1d"
            }
        );

        res.json({
            message:"Login Successful",
            token
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"server error"
        });
    }
};

export const getProfile = async(req,res)=>{
    res.json({
        message:"Welcome",
        user:req.user
    });
};

export const searchUser = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await searchUsers(username);

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await findUserByVerificationToken(token);
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired verification token"
            });
        }
        await verifyUser(user.id);
        res.json({
            message: "Email verified successfully"
        });
    } catch (error) {
        next(error);
    }
};