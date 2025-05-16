// !This file contains all the routes related to USERS

import express from "express";
import { signin, signup } from "../controllers/users.js"; //importing the logic of the routes

const router = express.Router(); //routes the application

router.post("/signin", signin);
router.post("/signup", signup);

export default router;
