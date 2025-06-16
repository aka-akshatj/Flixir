// !This file contains all the routes related to USERS

import express from "express";
import {
  signin,
  signup,
  searchUsers,
  savePost,
  getSavedPosts,
} from "../controllers/users.js"; //importing the logic of the routes
import auth from "../middleware/auth.js"; //authorization middleware

const router = express.Router(); //routes the application

router.get("/search", searchUsers); //for searching users
router.get("/saved-posts", auth, getSavedPosts); //for getting user's saved posts
router.post("/save-post/:postId", auth, savePost); //for saving/unsaving posts
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
