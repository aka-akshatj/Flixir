// !This file contains the action creators related to users.

import * as api from "../api";
import {
  SEARCH_USERS,
  SAVE_POST,
  FETCH_SAVED_POSTS,
} from "../constants/actionTypes";

//Action Creators - returns an action.
export const searchUsers = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.searchUsers(searchQuery);
    const action = { type: SEARCH_USERS, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const savePost = (postId) => async (dispatch) => {
  try {
    console.log("Saving post with ID:", postId);
    const { data } = await api.savePost(postId);
    console.log("Save post response:", data);
    const action = { type: SAVE_POST, payload: data };
    dispatch(action);
    // Refresh saved posts to update the UI
    dispatch(getSavedPosts());
  } catch (error) {
    console.error("Save post error:", error);
    console.error("Error response:", error.response?.data);
  }
};

export const getSavedPosts = () => async (dispatch) => {
  try {
    console.log("Fetching saved posts...");
    const { data } = await api.getSavedPosts();
    console.log("Saved posts response:", data);
    const action = { type: FETCH_SAVED_POSTS, payload: data };
    dispatch(action);
  } catch (error) {
    console.error("Get saved posts error:", error);
    console.error("Error response:", error.response?.data);
  }
};
