import {
    ADD_VENDORDETAILS_SUCCESS_ACTION,
    ADD_VENDORDETAILS_FAILURE_ACTION,
    FETCH_VENDOR_SUCCESS_ACTION,
    FETCH_VENDOR_FAILURE_ACTION,
    SAVE_VENDORDETAILS_SUCCESS_ACTION,
    SAVE_VENDORDETAILS_FAILURE_ACTION,
    SET_CURRENT_VENDOR,
    FETCH_AUDITOR_FAILURE_ACTION,
    FETCH_AUDITOR_SUCCESS_ACTION
} from "../actions/types";

import { toast } from "react-semantic-toasts";
const INIT_STATE = {};

export default function (state = INIT_STATE, action) {
    state = Object.assign({}, state, {});

    switch (action.type) {

        case FETCH_VENDOR_SUCCESS_ACTION:
            state.allUsers = action.payload.vendors;
            state.fetchUserError = false;
            return state;

        case FETCH_VENDOR_FAILURE_ACTION:
            state.fetchUserError = true;
            return state;

        case FETCH_AUDITOR_SUCCESS_ACTION:
            // console.log(action.payload.auditors,"iiiiiiiiiiiiiiiii")
            state.auditors = action.payload.auditors;
            state.fetchUserError = false;
            return state;

        case FETCH_AUDITOR_FAILURE_ACTION:
            state.fetchUserError = true;
            return state;

        case SAVE_VENDORDETAILS_SUCCESS_ACTION:
            state.saveUserDetailError = false;
            setTimeout(() => {
                toast({
                    type: "success",
                    icon: "thumbs up outline",
                    title: "Success",
                    description: "User Added Successfully",
                    time: 5000,
                });
            }, 0);
            return state;

        case ADD_VENDORDETAILS_SUCCESS_ACTION:
            state.addUserDetailError = false;
            return state;

        case ADD_VENDORDETAILS_FAILURE_ACTION:
            state.addUserDetailError = false;
            return state;

        case SAVE_VENDORDETAILS_FAILURE_ACTION:
            state.saveUserDetailError = true;
            return state;


        case SET_CURRENT_VENDOR:
            console.log(action.payload,"oooooooooooooooooooooooooo")
            state.currentVendor = action.payload;
            state.pin = "";
            return state;
    }
    return state;
}
