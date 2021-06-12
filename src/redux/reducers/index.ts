import { combineReducers } from "redux";
import userReducer from "./user.reducers";
import profileReducer from "./profile.reducers";
import inviteReducer from "./invite.reducers";
const reducers = combineReducers({
  user: userReducer,
  profile: profileReducer,
  invite: inviteReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
