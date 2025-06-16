// !This file contains the reducer for users.

import { SEARCH_USERS } from "../constants/actionTypes";

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return action.payload;
    default:
      return users;
  }
};

export default usersReducer;
