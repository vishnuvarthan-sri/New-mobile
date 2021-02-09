import authreducer from './auth_reducer';
import {
    combineReducers
} from 'redux';

const rootReducer = combineReducers({
auth:authreducer,

})
export default rootReducer;