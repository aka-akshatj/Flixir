//! This file is a single reducer for the post form.
import { SHOW_FORM } from "../constants/actionTypes";

const reducer = (formState = false, action) => {
  switch (action.type) {
    case SHOW_FORM:
      return !formState;
    default:
      return formState;
  }
};

export default reducer;
