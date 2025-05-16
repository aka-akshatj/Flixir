// !This file contains all the routes related to POSTS

import express from "express";

import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
} from "../controllers/posts.js"; //importing the logic of the routes
import auth from "../middleware/auth.js"; //authorization middleware

const router = express.Router(); //routes the application

router.get("/", getPosts); //for getting all the posts
router.get("/:id", getPost); //for getting a specific post using id

router.post("/", auth, createPost); //for submitting a post
router.post("/:id/commentPost", auth, commentPost);

router.patch("/:id", auth, updatePost); //for editing a post
router.patch("/:id/likePost", auth, likePost); //for liking a post //because an user should be able to like only once

router.delete("/:id", auth, deletePost); //for deleting a post

export default router;
