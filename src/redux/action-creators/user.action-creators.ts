import { UserActionTypes } from "../action-types/user.action-types";
import {
  UserLoginFailureAction,
  UserLoginSuccessAction,
  UserLoginRequestAction,
} from "../actions/user.actions";
import firebase from "firebase";

export function userLoginRequest(): UserLoginRequestAction {
  return {
    type: UserActionTypes.USER_LOGIN_REQUEST,
  };
}

export function userLoginSuccess(user: firebase.User): UserLoginSuccessAction {
  return {
    type: UserActionTypes.USER_LOGIN_SUCCESS,
    payload: user,
  };
}

export function userLoginFailure(): UserLoginFailureAction {
  return {
    type: UserActionTypes.USER_LOGIN_FAILURE,
  };
}
