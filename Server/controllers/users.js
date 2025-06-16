import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js"; //User Model
import PostMessage from "../models/postMessage.js"; //Post Model

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
  const {
    email,
    password,
    firstName,
    lastName,
    username,
    confirmPassword,
    about,
    profilePicture,
  } = req.body;

  try {
    // Validate required fields
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    //find if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists!" });

    //find if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already taken!" });

    //if user doesn't exist, then check the passwords
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    //if user doesnt exist and passwords match. Hash the password with a salt 12
    const hashedPassword = await bcrypt.hash(password, 12);

    //create the user
    const result = await User.create({
      email,
      password: hashedPassword,
      name:
        firstName && lastName ? `${firstName} ${lastName}` : firstName || "",
      username,
      about: about || "",
      profilePicture: profilePicture || "",
    });

    //create token
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    //return the user
    res.status(200).json({ result, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Something went wrong. Please try again!",
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Create search criteria for users
    const searchCriteria = {
      $or: [
        // Search by name (case insensitive)
        { name: { $regex: searchQuery, $options: "i" } },
        // Search by username (case insensitive)
        { username: { $regex: searchQuery, $options: "i" } },
      ],
    };

    // Find users but exclude password field
    const users = await User.find(searchCriteria).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize savedPosts array if it doesn't exist (for existing users)
    if (!user.savedPosts) {
      user.savedPosts = [];
    }

    // Check if post is already saved
    const isPostSaved = user.savedPosts.includes(postId);

    if (isPostSaved) {
      // Remove from saved posts (unsave)
      user.savedPosts = user.savedPosts.filter((id) => id !== postId);
    } else {
      // Add to saved posts (save)
      user.savedPosts.push(postId);
    }

    await user.save();

    res.status(200).json({
      message: isPostSaved
        ? "Post unsaved successfully"
        : "Post saved successfully",
      savedPosts: user.savedPosts,
    });
  } catch (error) {
    console.error("Save post error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize savedPosts array if it doesn't exist (for existing users)
    if (!user.savedPosts) {
      user.savedPosts = [];
      await user.save();
    }

    // Get all saved posts by their IDs
    const savedPosts = await PostMessage.find({
      _id: { $in: user.savedPosts },
    });

    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Get saved posts error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, name, about, profilePicture } = req.body;

    console.log("Update profile request:", {
      userId,
      username,
      name,
      about,
      profilePictureLength: profilePicture ? profilePicture.length : 0,
    });

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Current user:", {
      id: user._id,
      username: user.username,
      name: user.name,
      about: user.about,
      hasProfilePicture: !!user.profilePicture,
    });

    // Check if username is already taken by another user
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    // Update user fields
    user.username = username;
    user.name = name || user.name || "";
    user.about = about !== undefined ? about : user.about;
    user.profilePicture =
      profilePicture !== undefined ? profilePicture : user.profilePicture;

    console.log("Updated user fields:", {
      username: user.username,
      name: user.name,
      about: user.about,
      profilePictureLength: user.profilePicture
        ? user.profilePicture.length
        : 0,
    });

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(userId).select("-password");

    console.log("Profile updated successfully:", {
      id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      about: updatedUser.about,
      hasProfilePicture: !!updatedUser.profilePicture,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: error.message });
  }
};
