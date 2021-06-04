import { UserActionTypes } from "../action-types/user.action-types";
import { Action } from "../actions/user.actions";
import firebase from "firebase";

interface UserState {
  loading: boolean;
  user: firebase.User | null;
  failureLogin?: string;
  successLogin?: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
};

function userReducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UserActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default userReducer;
