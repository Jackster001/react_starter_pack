
import { combineReducers } from "redux";
import data from "./userReducer";
import userReducer from "./user"
import sessionReducer from "./session"

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer
});

export default rootReducer;