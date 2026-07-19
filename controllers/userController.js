import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser,findUserByEmail,searchUsers} from "../models/userModel.js";

export const registerUser = async(req,res,next)=>{
    try{

        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await createUser(username, email, hashedPassword);
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
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
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