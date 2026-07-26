import {followUser,unfollowUser,isFollowing,getFollowers,getFollowing} from "../models/followModel.js";
import { sendNotification } from "../services/notificationService.js";

export const follow = async (req, res) => {
    try {
        const followerId = req.user.id;
        const { userId } = req.params;
        if (Number(userId) === followerId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }
        const exists = await isFollowing(followerId, userId);
        if (exists) {
            return res.status(400).json({
                message: "Already following"
            });
        }
        const follow = await followUser(followerId, userId);
        await sendNotification(
        userId,
        `${req.user.username} started following you`
        );

        res.status(201).json(follow);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const unfollow = async (req, res) => {
    try {

        await unfollowUser(
            req.user.id,
            req.params.userId
        );

        res.json({
            message: "Unfollowed successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const followers = async (req, res) => {
    try {
        const users = await getFollowers(req.params.userId);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const following = async (req, res) => {
    try {
        const users = await getFollowing(req.params.userId);
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};