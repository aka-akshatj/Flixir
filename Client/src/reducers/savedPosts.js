// !This file contains the reducer for saved posts.

import { FETCH_SAVED_POSTS, SAVE_POST } from "../constants/actionTypes";

const savedPostsReducer = (savedPosts = [], action) => {
  switch (action.type) {
    case FETCH_SAVED_POSTS:
      return action.payload;
    case SAVE_POST:
      // The SAVE_POST action doesn't directly update the saved posts array
      // Instead, we'll refresh the saved posts after a save action
      return savedPosts;
    default:
      return savedPosts;
  }
};

export default savedPostsReducer;
