// ! DEFAULT IMPORTS
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// !FILE IMPORTS
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// ! APP SET UP
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); //Get & limit size of image
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //For cross-origin-requests
app.use("/posts", postRoutes); //Using the routes for posts
app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("APP is running!");
});
const PORT = process.env.PORT || 5000; //ports for the app

mongoose
    .connect(process.env.CONNECTION_URL, {
        //connecting to the database
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        //when connection is successful
        app.listen(PORT, () => {
            console.log(`Server running successfully on PORT: ${PORT}`);
        })
    )
    .catch((error) => {
        //when connection is unsuccessful
        console.log(error.message);
    });
