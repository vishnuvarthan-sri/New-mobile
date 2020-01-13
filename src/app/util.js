import moment from "moment";
import axios from "axios";

export const setupAxios = accessToken => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
};

/* for Admin */
export const isAdmin = user => {
  return user.role == "admin";
};

export function isLoggedIn(authState) {
  try {
    if (!authState.accessToken) return false;

    if (moment(authState.expiresIn).isBefore(moment())) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
