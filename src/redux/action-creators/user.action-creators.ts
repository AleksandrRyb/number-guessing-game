import firebase from "firebase";
import * as actions from "../actions/user.actions";
import { UserActionTypes as types } from "../action-types/user.action-types";

export function userLoginRequest(): actions.UserLoginRequestAction {
  return {
    type: types.USER_LOGIN_REQUEST,
  };
}

export function userLoginSuccess(): actions.UserLoginSuccessAction {
  return {
    type: types.USER_LOGIN_SUCCESS,
  };
}

export function userLoginFailure(): actions.UserLoginFailureAction {
  return {
    type: types.USER_LOGIN_FAILURE,
  };
}

export function userListening(
  user: firebase.User | null
): actions.UserListeningAction {
  return {
    type: types.USER_LISTENING,
    payload: user,
  };
}

export function userListeningSuccess(): actions.UserListeningSuccessAction {
  return {
    type: types.USER_LISTENING_SUCCESS,
  };
}

export function userListeningFailure(): actions.UserListeningFailureAction {
  return {
    type: types.USER_LISTENING_FAILURE,
  };
}

export function setUser(user: firebase.User): actions.SetUserAction {
  return {
    type: types.SET_USER,
    payload: user,
  };
}

export function unsetUser(): actions.UnsetUserAction {
  return {
    type: types.UNSET_USER,
  };
}

export function logOut(): actions.LogOutAction {
  return {
    type: types.LOG_OUT,
  };
}

export function logOutSuccess(): actions.LogOutSuccessAction {
  return {
    type: types.LOG_OUT_SUCCESS,
  };
}
