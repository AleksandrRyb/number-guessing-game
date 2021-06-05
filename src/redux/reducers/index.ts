import { combineReducers } from "redux";
import userReducer from "./user.reducers";

const reducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
