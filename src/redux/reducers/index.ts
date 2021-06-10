import { combineReducers } from "redux";
import userReducer from "./user.reducers";
import profileReducer from "./profile.reducers";

const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
