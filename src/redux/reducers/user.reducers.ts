import { UserActionTypes as types } from "../action-types/user.action-types";
import { UserActions } from "../actions/user.actions";
import firebase from "firebase";

interface UserState {
  isFetchingUser: boolean;
  user: firebase.User | null;
  userLoginRequest: boolean;
}

const initialState: UserState = {
  isFetchingUser: true,
  user: null,
  userLoginRequest: false,
};

function userReducer(state: UserState = initialState, action: UserActions) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        userLoginRequest: true,
        isFetchingUser: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginRequest: true,
        isFetchingUser: false,
        user: action.payload,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginRequest: true,
        isFetchingUser: false,
      };
    case types.USER_LISTENING:
      return {
        ...state,
        isFetchingUser: true,
      };
    case types.SET_USER:
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload,
      };
    case types.LOG_OUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

export default userReducer;
