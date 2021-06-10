import { UserActionTypes as types } from "../action-types/user.action-types";
import {
  UserLoginFailureAction,
  UserLoginSuccessAction,
  UserLoginRequestAction,
  UserListeningAction,
  UserListeningSuccessAction,
  UserListeningFailureAction,
  SetUserAction,
  UnsetUserAction,
  LogOutAction,
  LogOutSuccessAction,
} from "../actions/user.actions";
import firebase from "firebase";

export function userLoginRequest(): UserLoginRequestAction {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
}

export function userLoginSuccess(): UserLoginSuccessAction {
  return {
    type: types.USER_LOGIN_SUCCESS,
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

export function userListeningSuccess(): UserListeningSuccessAction {
  return {
    type: types.USER_LISTENING_SUCCESS,
  };
}

export function userListeningFailure(): UserListeningFailureAction {
  return {
    type: types.USER_LISTENING_FAILURE,
  };
}

export function setUser(user: firebase.User): SetUserAction {
  return {
    type: types.SET_USER,
    payload: user,
  };
}

export function unsetUser(): UnsetUserAction {
  return {
    type: types.UNSET_USER,
  };
}

export function logOut(): LogOutAction {
  return {
    type: types.LOG_OUT,
  };
}

export function logOutSuccess(): LogOutSuccessAction {
  return {
    type: types.LOG_OUT_SUCCESS,
  };
}
