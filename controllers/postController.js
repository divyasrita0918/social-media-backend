import {createPost as createPostModel, getAllPosts, getPostById, updatePost,deletePost, searchPosts, getTotalPosts} from "../models/postModel.js"
import redisClient from "../config/redis.js";

export const createPost= async(req,res)=>{
    try{
        const {content, imageUrl} = req.body;
        const userId = req.user.id;
        const post = await createPostModel(req.user.id, content,imageUrl);

        const keys = await redisClient.keys("posts:*");

        if (keys.length > 0) {
            await redisClient.del(keys);
        }
        res.status(201).json(post);
    } catch(error){
        console.log(error);

        res.status(500).json({
            message:"Failed to create post"
        });
    }
};

export const fetchPost = async(req,res)=>{
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const offset = (page - 1) * limit;

        const cacheKey = `posts:${page}:${limit}`;
        const cachedPosts = await redisClient.get(cacheKey);
        if (cachedPosts) {
            console.log("Serving from Redis");
            return res.json(JSON.parse(cachedPosts));

        }

        const posts = await getAllPosts(limit, offset);
        const totalPosts = await getTotalPosts();
        const totalPages = Math.ceil(totalPosts / limit);

        await redisClient.set(
            cacheKey,
            JSON.stringify(posts)
        );

        console.log("Serving from PostgreSQL");
        res.json({
                 page,
                 limit,
                 totalPosts,
                 totalPages,
                 posts
}               );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const editPost = async(req,res)=>{
    try{
    const {id} = req.params;
    const {content} = req.body;
    const post = await getPostById(id);
    if(!post){
        return res.status(404).json({
            message:"No post exist"
        });
    }

    if(post.user_id !== req.user.id){
        return res.status(403).json({
                message: "You can only edit your own posts"
            });
    }

    const updatedPost = await updatePost(id, content);
    const keys = await redisClient.keys("posts:*");

        if (keys.length > 0) {
            await redisClient.del(keys);
        } 
    res.json(updatedPost);
}catch(error){
    console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
}

};

export const removePost = async (req, res) => {

    try {

        const { id } = req.params;
        const post = await getPostById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.user_id !== req.user.id) {
            return res.status(403).json({
                message: "You can delete only your own posts"
            });
        }

        await deletePost(id);
        const keys = await redisClient.keys("posts:*");

        if (keys.length > 0) {
            await redisClient.del(keys);
        }
        res.json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const searchPost = async (req, res) => {

    try {
        const { content } = req.query;
        const posts = await searchPosts(content);
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};