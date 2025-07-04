import axios from "axios";

// const API = axios.create({ baseURL: "https://polaroid-webapp.herokuapp.com/" });
const API = axios.create({ baseURL: "http://localhost:5000/" });

//send token to backend
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");

export const fetchUserPosts = () => API.get("/posts/user/posts");

export const searchUsers = (searchQuery) =>
  API.get(`/user/search?searchQuery=${searchQuery}`);

export const savePost = (postId) => API.post(`/user/save-post/${postId}`);

export const getSavedPosts = () => API.get("/user/saved-posts");

export const updateProfile = (profileData) =>
  API.patch("/user/profile", profileData);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);
