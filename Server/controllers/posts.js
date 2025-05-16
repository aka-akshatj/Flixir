//!This file contains all the LOGIC for the routes related to POSTS.

import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        //try to get all the posts
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        //if unable to get posts
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body; //retreive new post details from body
    // console.log(req);
    // console.log(post);
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    }); //create a new object using PostMessage model
    try {
        //save the post to the database
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        //unable to save the post
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            { ...post, _id },
            {
                new: true,
            }
        );
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ error });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    try {
        await PostMessage.findByIdAndRemove(id);
        res.json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(409).json({ error });
    }
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    //if userId doesn't exist => not authorized
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(id);

    //check if post is liked by the person already
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        //like the post. Push the userId into the likes array
        post.likes.push(req.userId);
    } else {
        //dislike the post. Remove the userId from the likes array.
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    });

    res.json(updatedPost);
};

export const commentPost = async (req, res) => {
    const { id } = req.params; //id comes from the params
    const { value } = req.body; //values is passed in the body

    const post = await PostMessage.findById(id);

    post.comments.unshift(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    });

    res.json(updatedPost);
};
