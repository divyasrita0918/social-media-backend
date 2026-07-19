import { getFeed } from "../models/feedModel.js";

export const fetchFeed = async (req, res) => {
    try {
        const feed = await getFeed(req.user.id);
        res.json(feed);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};