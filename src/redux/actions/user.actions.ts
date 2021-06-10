import { UserActionTypes as types } from "../action-types/user.action-types";
import firebase from "firebase";

export interface UserLoginRequestAction {
  type: types.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccessAction {
  type: types.USER_LOGIN_SUCCESS;
}

export interface UserLoginFailureAction {
  type: types.USER_LOGIN_FAILURE;
}

export interface UserListeningAction {
  type: types.USER_LISTENING;
  payload: firebase.User | null;
}

export interface UserListeningSuccessAction {
  type: types.USER_LISTENING_SUCCESS;
}

export interface UserListeningFailureAction {
  type: types.USER_LISTENING_FAILURE;
}

export interface SetUserAction {
  type: types.SET_USER;
  payload: firebase.User;
}

export interface UnsetUserAction {
  type: types.UNSET_USER;
}

export interface LogOutAction {
  type: types.LOG_OUT;
}

export interface LogOutSuccessAction {
  type: types.LOG_OUT_SUCCESS;
}

export type UserActions =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction
  | UserListeningAction
  | UserListeningFailureAction
  | UserListeningSuccessAction
  | SetUserAction
  | UnsetUserAction
  | LogOutAction
  | LogOutSuccessAction;
