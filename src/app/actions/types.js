import axios from 'axios';
import config from '../config.js';

export const API_URL = config['api_url'];

axios.defaults.baseURL = API_URL;

export const LOGIN_SUCCESS_ACTION = 'login_success';
export const LOGIN_FAILURE_ACTION = 'login_failure';
export const LOGOUT_SUCCESS_ACTION= 'logout_sucess';
export const LOGOUT_FAILURE_ACTION= 'logout_failure';
