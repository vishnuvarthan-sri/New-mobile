import axios from 'axios';
import config from '../config.js';

export const API_URL = config['api_url'];

axios.defaults.baseURL = API_URL;
export const SELECT_MENU_ACTION = 'select_menu';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILURE = 'login_failure';
export const LOGOUT_ACTION = 'logout';

// user
export const FETCH_USER_SUCCESS_ACTION = "user_action_success";
export const FETCH_USER_FAILURE_ACTION = "user_failure_action";
export const SAVE_USERDETAILS_SUCCESS_ACTION = "user_save_success_action";
export const SAVE_USERDETAILS_FAILURE_ACTION = "user_save_failure_action";
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const FETCH_ASSIGNED_LINEITEM_SUCCESS_ACTION = "user_line_item_success";
export const FETCH_ASSIGNED_LINEITEM_FAILURE_ACTION = "user_line_item_failure";
export const FORGOTPASSWORD_SUCCESS_ACTION = "forgotpassword_success";
export const FORGOTPASSWORD_FAILURE_ACTION = "forgotpassword_failure";
export const SAVE_RESET_SUCCESS_ACTION = "save_reset_password_success";
export const SAVE_RESET_FAILURE_ACTION = "save_reset_password_failure";
export const GENERATEPIN_SUCCESS_ACTION = "generate_pin_success";
export const GENERATEPIN_FAILURE_ACTION = "generate_pin_failure";
export const REASSIGN_SUCCESS_ACTION = "reassign_success";
export const REASSIGN_FAILURE_ACTION = "reassign_failure";


//hdfc

export const FETCH_HDFC_MASTER_SUCCESS_ACTION = "hdfc_template_success";
export const FETCH_HDFC_MASTER_FAILURE_ACTION = "hdfc_template_failure";