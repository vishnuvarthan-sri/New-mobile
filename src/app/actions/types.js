import axios from 'axios';
import config from '../config.js';

export const API_URL = config['api_url'];

axios.defaults.baseURL = API_URL;
export const SELECT_MENU_ACTION = 'select_menu';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILURE = 'login_failure';
export const LOGOUT_ACTION = 'logout';