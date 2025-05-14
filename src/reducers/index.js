// !This file combines all the reducers and exports them

import { combineReducers } from "redux";

import posts from "./posts";
import form from "./form";
import authReducer from "./auth";

export default combineReducers({
  posts: posts,
  form: form,
  auth: authReducer,
});
