import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_ACTION } from "../actions/types";
import moment from "moment";
import { setupAxios } from "../util";

const INIT_STATE = {};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      state = {
        id: action.payload.userId,
        displayName: action.payload.displayName,
        mobileNo: action.payload.mobileNo,
        role: action.payload.role,
        accessToken: action.payload.access_token,
        expiresIn: moment().add(action.payload.expires_in, "seconds").format(),
        loginError: false
      };
      setupAxios(state.accessToken);
      return state;

    case LOGIN_FAILURE:
      state = {
        loginError: true,
        loginMessage:action.payload.data.message
      };
      return state;

    case LOGOUT_ACTION:
      state = {};
      return state;
  }

  if (state.accessToken) {
    setupAxios(state.accessToken);
  }

  return state;
}
