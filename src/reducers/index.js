
import { combineReducers } from "redux";
import userReducer from "./user"
import sessionReducer from "./session"
import groupReducer from "./group";
import alarmReducer from "./alarm";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  groupState: groupReducer,
  alarmState: alarmReducer
});

export default rootReducer;