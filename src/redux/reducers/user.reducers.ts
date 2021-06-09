import { UserActionTypes as types } from "../action-types/user.action-types";
import { Actions } from "../actions/user.actions";
import firebase from "firebase";

interface UserState {
  isFetching: boolean;
  user: firebase.User | null;
  userLoginRequest: boolean;
}

const initialState: UserState = {
  isFetching: false,
  user: null,
  userLoginRequest: false,
};

function userReducer(state: UserState = initialState, action: Actions) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        userLoginRequest: true,
        isFetching: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginRequest: true,
        isFetching: false,
        user: action.payload,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginRequest: true,
        isFetching: false,
      };
    case types.USER_LISTENING:
      return {
        ...state,
        isFetching: true,
      };
    case types.SET_USER:
      return {
        ...state,
        isFetching: false,
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
