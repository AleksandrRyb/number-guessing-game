import { UserActionTypes as types } from "../action-types/user.action-types";
import {
  UserLoginFailureAction,
  UserLoginSuccessAction,
  UserLoginRequestAction,
  UserListeningAction,
  SetUserAction,
  LogOutAction,
} from "../actions/user.actions";
import firebase from "firebase";

export function userLoginRequest(): UserLoginRequestAction {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
}

export function userLoginSuccess(user: firebase.User): UserLoginSuccessAction {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: user,
  };
}

export function userLoginFailure(): UserLoginFailureAction {
  return {
    type: types.USER_LOGIN_FAILURE,
  };
}

export function userListening(user: firebase.User | null): UserListeningAction {
  return {
    type: types.USER_LISTENING,
    payload: user,
  };
}

export function setUser(user: firebase.User): SetUserAction {
  return {
    type: types.SET_USER,
    payload: user,
  };
}

export function logOut(): LogOutAction {
  return {
    type: types.LOG_OUT,
  };
}
