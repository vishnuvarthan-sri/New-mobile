import {
  FETCH_USER_SUCCESS_ACTION,
  FETCH_USER_FAILURE_ACTION,
  SAVE_USERDETAILS_SUCCESS_ACTION,
  SAVE_USERDETAILS_FAILURE_ACTION,
  SET_CURRENT_USER,
  FETCH_ASSIGNED_LINEITEM_SUCCESS_ACTION,
  FETCH_ASSIGNED_LINEITEM_FAILURE_ACTION,
  FORGOTPASSWORD_SUCCESS_ACTION,
  FORGOTPASSWORD_FAILURE_ACTION,
  SAVE_RESET_SUCCESS_ACTION,
  SAVE_RESET_FAILURE_ACTION,
  GENERATEPIN_SUCCESS_ACTION,
  GENERATEPIN_FAILURE_ACTION
} from "../actions/types";

import { toast } from "react-semantic-toasts";
const INIT_STATE = {};

export default function(state = INIT_STATE, action) {
  state = Object.assign({}, state, {});

  switch (action.type) {
    case FETCH_USER_SUCCESS_ACTION:
    case FETCH_ASSIGNED_LINEITEM_SUCCESS_ACTION:
      state.allUsers = action.payload.users;
      state.fetchUserError = false;
      return state;

    case FETCH_USER_FAILURE_ACTION:
    case FETCH_ASSIGNED_LINEITEM_FAILURE_ACTION:
      state.fetchUserError = true;
      return state;
    case SAVE_USERDETAILS_SUCCESS_ACTION:
      state.saveUserDetailError = false;
      return state;

    case GENERATEPIN_SUCCESS_ACTION:
      console.log(action.payload.pin)
      state.pin = action.payload.pin;
      state.fetchPinError = false;
      setTimeout(() => {
        toast({
          type: "success",
          icon: "thumbs up outline",
          title: "Success",
          description: "PIN will be expired within 10 minutes",
          time: 5000
        });
      }, 0);

      return state;

    case GENERATEPIN_FAILURE_ACTION:
      state.fetchPINError = true;
      setTimeout(() => {
        toast({
          type: "error",
          icon: "thumbs down outline",
          title: "error",
          description: "contact system admin",
          time: 5000
        });
      }, 0);
      return state;

    case SAVE_USERDETAILS_FAILURE_ACTION:
      state.saveUserDetailError = true;
      return state;
    case FORGOTPASSWORD_SUCCESS_ACTION:
      state.forgotpasswordError = false;
      setTimeout(() => {
        toast({
          type: "success",
          icon: "thumbs up outline",
          title: "Success",
          description: "Reset password email sent to the user",
          time: 5000
        });
      }, 0);
      return state;

    case FORGOTPASSWORD_FAILURE_ACTION:
      state.forgotpasswordError = true;
      setTimeout(() => {
        toast({
          type: "error",
          icon: "thumbs down outline",
          title: "error",
          description: "contact system admin",
          time: 5000
        });
      }, 0);
      return state;

    case SAVE_RESET_SUCCESS_ACTION:
      state.saveResetPasswordError = false;
      setTimeout(() => {
        toast({
          type: "success",
          icon: "thumbs up outline",
          title: "Success",
          description: "password changed Succesfully",
          time: 5000
        });
      }, 0);
      return state;

    case SAVE_RESET_FAILURE_ACTION:
      console.log(action.payload);
      state.saveResetPasswordError = true;
      setTimeout(() => {
        toast({
          type: "error",
          icon: "thumbs down outline",
          title: "error",
          description: "contact system admin",
          time: 5000
        });
      }, 0);
      return state;

    case SET_CURRENT_USER:
      state.currentUser = action.payload;
      state.pin = "";
      return state;
  }
  return state;
}
