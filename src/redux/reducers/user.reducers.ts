import { UserActionTypes as types } from "../action-types/user.action-types";
import { UserActions } from "../actions/user.actions";
import firebase from "firebase";

interface UserState {
  isFetchingUser: boolean;
  user: firebase.User | null;
  isListening: boolean;
}

const initialState: UserState = {
  isFetchingUser: false,
  user: null,
  isListening: true,
};

function userReducer(state: UserState = initialState, action: UserActions) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetchingUser: true,
        isListening: false,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        isListening: true,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
      };
    case types.USER_LISTENING:
      return {
        ...state,
        isFetchingUser: true,
      };
    case types.USER_LISTENING_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
        isListening: false,
      };
    case types.USER_LISTENING_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
      };
    case types.LOG_OUT:
      return {
        ...state,
        isListening: false,
        isFetchingUser: true,
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        isListening: false,
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.UNSET_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export default userReducer;
