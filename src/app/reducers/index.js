import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import userReducer from "./user_reducer";
import homeReducer from './home_reducer';
import hdfcReducer from "./hdfc_reducer";
import reportReducer from "./report_reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  hdfc: hdfcReducer,
  user: userReducer,
  report: reportReducer
});

export default rootReducer;
