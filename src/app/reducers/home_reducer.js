import {
    SELECT_MENU_ACTION
} from '../actions/types';
import moment from 'moment'
import {
    setupAxios
} from '../util';

const INTIAL_STATE = {};

export default function (state = INTIAL_STATE, action) {
    switch (action.type) {
        case SELECT_MENU_ACTION:
            return Object.assign({}, state, {
                selectedMenu: action.payload
            });
    }
    return state;
}