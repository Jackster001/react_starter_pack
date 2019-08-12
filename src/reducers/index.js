
import { combineReducers } from "redux";
import userReducer from "./user"
import sessionReducer from "./session"

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer
});

export default rootReducer;