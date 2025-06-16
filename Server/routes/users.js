// !This file contains all the routes related to USERS

import express from "express";
import { signin, signup, searchUsers } from "../controllers/users.js"; //importing the logic of the routes

const router = express.Router(); //routes the application

router.get("/search", searchUsers); //for searching users
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
