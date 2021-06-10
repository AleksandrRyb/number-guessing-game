import { UserActionTypes as types } from "../action-types/user.action-types";
import firebase from "firebase";

export interface UserLoginRequestAction {
  type: types.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccessAction {
  type: types.USER_LOGIN_SUCCESS;
  payload: firebase.User;
}

export interface UserLoginFailureAction {
  type: types.USER_LOGIN_FAILURE;
}

export interface UserListeningAction {
  type: types.USER_LISTENING;
  payload: firebase.User | null;
}

export interface SetUserAction {
  type: types.SET_USER;
  payload: firebase.User;
}

export interface LogOutAction {
  type: types.LOG_OUT;
}

export type UserActions =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | SetUserAction
  | UserListeningAction
  | LogOutAction;
