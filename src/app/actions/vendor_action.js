import axios from "axios";
import qs from "qs";
import * as types from "./types";

// add new vendor
export const AddVendorDetailAction = (user) => {
    return function(dispatch) {
      axios
          .post(types.API_URL + '/ebgc/v1/addVendors',user)
          .then(function(response) {
              dispatch({
                  type: types.ADD_VENDORDETAILS_SUCCESS_ACTION,
                  payload: response.data
              });
          })
          .catch(function(error) {
              dispatch({
                  type: types.ADD_VENDORDETAILS_FAILURE_ACTION,
                  payload: error
              });
          });
  };
  }

export const fetchVendorAction = () => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "/ebgc/v1/getVendors")
      .then(function(response) {
        dispatch({
          type: types.FETCH_VENDOR_SUCCESS_ACTION,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_VENDOR_FAILURE_ACTION,
          payload: error
        });
      });
  };
};

export const fetchAuditorAction = () => {
    return function(dispatch) {
      axios
        .get(types.API_URL + "/ebgc/v1/getfieldExcecutives")
        .then(function(response) {
          dispatch({
            type: types.FETCH_AUDITOR_SUCCESS_ACTION,
            payload: response.data
          });
        })
        .catch(function(error) {
          dispatch({
            type: types.FETCH_AUDITOR_FAILURE_ACTION,
            payload: error
          });
        });
    };
  };
  

//save edited user
export const saveVendorDetailAction = (user) => {
    return function(dispatch) {
        axios.put(types.API_URL + '/ebgc/v1/editVendors', user)
        .then(function(response) {
            dispatch({
                type: types.SAVE_VENDORDETAILS_SUCCESS_ACTION,
                payload: response.data
            });
        })
        .catch(function(err) {
            dispatch({
                type: types.SAVE_VENDORDETAILS_FAILURE_ACTION,
                payload: err
            });
        });
    };
};

export const setCurrentVendor = (user) => {
    return function(dispatch) {
        dispatch({
            type: types.SET_CURRENT_VENDOR,
            payload: user
        })
    }
  }






