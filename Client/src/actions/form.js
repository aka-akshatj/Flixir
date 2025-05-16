// This file contains the action creators related to form.
import { SHOW_FORM } from "../constants/actionTypes";

export const showForm = (formState) => {
  const action = { type: SHOW_FORM, payload: formState };
  return action;
};
