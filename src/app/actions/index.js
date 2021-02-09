import axios from 'axios';
import * as types from './types';

export const loginAction = (username, password) => {
    return function (dispatch) {
        axios.post(types.API_URL + '/aV/v1/login', {
                email: username,
                password: password
            })
            .then(function (response) {
                dispatch({
                    type: types.LOGIN_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: types.LOGIN_FAILURE_ACTION,
                    payload: error
                });
            });
    };
}

export const logoutAction = ({token}) => {
    return function (dispatch) {
        axios.post(types.API_URL + `/aV/v1/logout?token=${token}` )
            .then(function (response) {
                dispatch({
                    type: types.LOGOUT_SUCCESS_ACTION,
                    payload: response.data
                });
            })
            .catch(function (error) {
                dispatch({
                    type: types.LOGIN_FAILURE_ACTION,
                    payload: error
                });
            });
    };
   
}