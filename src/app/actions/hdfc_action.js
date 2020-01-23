import axios from "axios";
import qs from "qs";
import * as types from "./types";

export const fetchHdfcTemplatesAction = () => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "employee/v1/templates")
      .then(function(response) {
        dispatch({
          type: types.FETCH_HDFC_TEMPLATE_SUCCESS_ACTION,
          payload: response.data
        });
        console.log(response.data);
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_HDFC_TEMPLATE_FAILURE_ACTION,
          payload: error
        });
      });
  };
};