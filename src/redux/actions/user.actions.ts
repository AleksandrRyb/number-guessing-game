import { UserActionTypes } from "../action-types/user.action-types";
import firebase from "firebase";

export interface UserLoginRequestAction {
  type: UserActionTypes.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccessAction {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: firebase.User;
}

export interface UserLoginFailureAction {
  type: UserActionTypes.USER_LOGIN_FAILURE;
}

export type Action =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailureAction;
