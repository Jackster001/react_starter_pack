
import { combineReducers } from "redux";
import userReducer from "./user"
import sessionReducer from "./session"
import groupReducer from "./group";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  groupState: groupReducer
});

export default rootReducer;