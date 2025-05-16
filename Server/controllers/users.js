import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js"; //User Model

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        //finding if an user with that email exists
        const existingUser = await User.findOne({ email });

        //if user doesn't exist
        if (!existingUser)
            return res.status(404).json({ message: "User doesn't exist." });

        //if user exists then check entered password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        //if password is wrong
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Wrong Password" });

        //if all is okay then create a web token for the user.
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );

        //send back user details and token
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({
            message: "Someting went wrong. Please try again!",
        });
    }
};

export const signup = async (req, res) => {
    //get the user details
    const { email, password, firstName, lastName, userName, confirmPassword } =
        req.body;

    try {
        //find if the email already exists
        const existingUser = await User.findOne({ email });

        //if email exists
        if (existingUser)
            return res.status(400).json({ message: "Email already exists!" });

        //if user doesn't exist, then check the passwords
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords do not match" });

        //if user doesnt exist and passwords match. Hash the password with a salt 12
        const hashedPassword = await bcrypt.hash(password, 12);

        //create the user
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            username: userName,
        });

        //create token
        const token = jwt.sign(
            { email: result.email, id: result._id },
            "test",
            { expiresIn: "1h" }
        );

        //return the user
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({
            message: "Someting went wrong. Please try again!",
        });
    }
};
