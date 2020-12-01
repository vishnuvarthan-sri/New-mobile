import moment from "moment";
import axios from "axios";

export const setupAxios = accessToken => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
};

/* for Admin */
export const isAdmin = user => {
  return user.role == "admin";
};
export const isQualityControl = user => {
  return user.role == "qualityControlAgents";
};
export const isFieldExecutive = user => {
  return user.role == "fieldexecutive";
};

export const isVendor = user => {
  console.log(user.role)
  return user.role == "vendor";
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

export const loadState = () => {
  try {
      const serialisedState = localStorage.getItem('auditProState');
      if (serialisedState === null) {
          return undefined;
      }
      return JSON.parse(serialisedState);
  } catch (error) {
      return undefined;
  }
}

export const saveState = (state) => {
  try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem('auditProState', serialisedState);
  } catch (error) {

  }
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

Array.prototype.insertAt = function(index, item) {
  this.splice(index, 0, item);
};
