import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import homeReducer from './home_reducer';
const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export default rootReducer;
