import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false, // Make name optional
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: { type: String, required: true },
  about: {
    type: String,
    default: "",
    maxlength: 500, // Limit about section length
  },
  profilePicture: {
    type: String,
    default: "", // URL to profile picture
  },
  id: { type: String },
  savedPosts: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("User", userSchema);
