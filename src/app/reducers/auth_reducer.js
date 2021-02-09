import { LOGIN_SUCCESS_ACTION, LOGIN_FAILURE_ACTION, LOGOUT_SUCCESS_ACTION, LOGOUT_FAILURE_ACTION } from '../actions/types';
import moment from 'moment';
import { setupAxios } from '../util'


const INIT_STATE = {};
export default function (state = INIT_STATE, action) {
    switch (action.type) {
        case LOGIN_SUCCESS_ACTION:
            state = {
                email: action.payload.Email,
                Name: action.payload.Name,
                accessToken: action.payload.access_token,
                expiresIn: moment().add(action.payload.expires_in, 'seconds').format(),
                loginError: false,
            }
            console.log('login success');
            setupAxios(state.accessToken);
            return state;

        case LOGIN_FAILURE_ACTION:
            state = {
                loginError: true
            }
            console.log('login failed');
            return state;
        case LOGOUT_SUCCESS_ACTION:
            state.logout = action.payload,
            state.logoutError = false
            return state;
        case LOGOUT_FAILURE_ACTION:
            state.logoutError = true
            return state;
    }
    if (state.accessToken) {
        setupAxios(state.accessToken);
    }

    return state;
}