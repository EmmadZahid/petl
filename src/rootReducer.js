import { combineReducers } from "redux";
import { authReducer } from "./containers/auth/state/authReducer";

export const rootReducer = combineReducers({ 
    auth: authReducer
});