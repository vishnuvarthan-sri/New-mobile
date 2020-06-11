import axios from "axios";
import qs from "qs";
import * as types from "./types";

export const fetchHdfcMasterAction = () => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "employee/v1/get/audits")
      .then(function(response) {
        dispatch({
          type: types.FETCH_HDFC_MASTER_SUCCESS_ACTION,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_HDFC_MASTER_FAILURE_ACTION,
          payload: error
        });
      });
  };
};
export const getPhotoUrlAction = (auditId) => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "employee/v1/getPhotoUrls?auditId="+auditId)
      .then(function(response) {
        dispatch({
          type: types.FETCH_HDFC_PHOTO_SUCCESS_ACTION,
          payload: response.data
        });
      
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_HDFC_PHOTO_FAILURE_ACTION,
          payload: error
        });
      });
  };
};

export const saveHdfcAuditAction = (auditId,audit) => {
  return function(dispatch) {
    axios
      .put(types.API_URL + "employee/v1/edit/audits?audit_id="+auditId,audit)
      .then(function(response) {
        dispatch({
          type: types.SAVE_AUDIT_SUCCESS_ACTION,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.SAVE_AUDIT_FAILURE_ACTION,
          payload: error
        });
      });
  };
};
