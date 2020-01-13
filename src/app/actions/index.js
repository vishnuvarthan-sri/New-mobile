import axios from "axios";
import * as types from "./types";

export const loginAction = (name, password) => {
  return function(dispatch) {
    axios
      .post(types.API_URL + "admin/login", {
        email: name,
        password: password
      })
      .then(function(response) {
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: error
        });
      });
  };
};

export const logoutAction = () => {
  return {
    type: types.LOGOUT_ACTION
  };
};
