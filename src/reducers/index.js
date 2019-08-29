import { combineReducers } from "redux";
import userReducer from "./user";
import sessionReducer from "./session"
import groupReducer from "./group";
import alarmReducer from "./alarm";
import lostReducer from "./lost";
import notificationReducer from "./notifications"

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  groupState: groupReducer,
  alarmState: alarmReducer,
  lostState: lostReducer,
  notificationState: notificationReducer
});

export default rootReducer;