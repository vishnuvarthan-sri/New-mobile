import axios from "axios";
import qs from "qs";
import * as types from "./types";

export const fetchUserAction = () => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "ebgc/v1/getUsers")
      .then(function(response) {
        dispatch({
          type: types.FETCH_USER_SUCCESS_ACTION,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_USER_FAILURE_ACTION,
          payload: error
        });
      });
  };
};

//save edited user
export const saveUserDetailAction = (user) => {
    return function(dispatch) {
        axios.put(types.API_URL + 'ebgc/v1/editUsers', user)
        .then(function(response) {
            dispatch({
                type: types.SAVE_USERDETAILS_SUCCESS_ACTION,
                payload: response.data
            });
        })
        .catch(function(err) {
            dispatch({
                type: types.SAVE_USERDETAILS_FAILURE_ACTION,
                payload: err
            });
        });
    };
};

// add new user

export const AddUsersDetailAction = (user) => {
  return function(dispatch) {
    axios
        .post(types.API_URL + 'ebgc/v1/addUsers',user)
        .then(function(response) {
            dispatch({
                type: types.ADD_USERSDETAILS_SUCCESS_ACTION,
                payload: response.data
            });
        })
        .catch(function(error) {
            dispatch({
                type: types.ADD_USERSDETAILS_FAILURE_ACTION,
                payload: error
            });
        });
};
}

//setting currrent user
export const setCurrentUser = (user) => {
  return function(dispatch) {
      dispatch({
          type: types.SET_CURRENT_USER,
          payload: user
      })
  }
}


// Initial Audits for assigning to another auditor
export const fetchAssignedLineItemAction = (user) => {
  return function(dispatch) {
    axios
      .get(types.API_URL + "employee/v1/get/masterdata?userId=" + user)
      .then(function(response) {
        dispatch({
          type: types.FETCH_ASSIGNED_LINEITEM_SUCCESS_ACTION,
          payload: response.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: types.FETCH_ASSIGNED_LINEITEM_FAILURE_ACTION,
          payload: error
        });
      });
  };
};
// forgot passwor section
export const forgotPasswordAction = (userId) => {
  return function(dispatch) {
    axios
    .get(types.API_URL + "ebgc/v1/forgotpassword?userId=" + userId)
      .then(function(response) {
          dispatch({
              type: types.FORGOTPASSWORD_SUCCESS_ACTION,
              payload: response.data
          });
      })
      .catch(function(err) {
          dispatch({
              type: types.FORGOTPASSWORD_FAILURE_ACTION,
              payload: err
          });
      });
  };
};

export const saveResetPasswordAction = (email,newPassword,code) => {
  console.log(email,newPassword,code);
  return function(dispatch) {
      axios.post(types.API_URL + `ebgc/v1/resetpassword?mailid=${email}&newpassword=${newPassword}&code=${code}`)
      .then(function(response) {
          dispatch({
              type: types.SAVE_RESET_SUCCESS_ACTION,
              payload: response.data
          });
      })
      .catch(function(err) {
          dispatch({
              type: types.SAVE_RESET_FAILURE_ACTION,
              payload: err
          });
      });
  };
}

//generate pin section
export const generatePinAction = (userId) => {
  return function(dispatch) {
    axios
    .get(types.API_URL + "ebgc/v1/generatePin?userId=" + userId)
      .then(function(response) {
          dispatch({
              type: types.GENERATEPIN_SUCCESS_ACTION,
              payload: response.data
          });
          
      })
      .catch(function(err) {
          dispatch({
              type: types.GENERATEPIN_FAILURE_ACTION,
              payload: err
          });
        
      });
  };
};

//reassign audits -active

export const reassignAuditAction = (auditId,userId) => {
  return function(dispatch) {
    axios
    .put(types.API_URL + `ebgc/v1/reassign?auditId=${auditId}&userId=${userId}`)
      .then(function(response) {
          dispatch({
              type: types.REASSIGN_SUCCESS_ACTION,
              payload: response.data
          });
          console.log(response.data);
      })
      .catch(function(err) {
          dispatch({
              type: types.REASSIGN_FAILURE_ACTION,
              payload: err
          });
          console.log(err);
      });
  };
};
