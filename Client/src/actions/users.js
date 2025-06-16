// !This file contains the action creators related to users.

import * as api from "../api";
import { SEARCH_USERS } from "../constants/actionTypes";

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
