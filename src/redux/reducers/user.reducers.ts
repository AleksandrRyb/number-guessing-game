import { UserActionTypes as types } from "../action-types/user.action-types";
import { Actions } from "../actions/user.actions";
import firebase from "firebase";

interface UserState {
  loading: boolean;
  user: firebase.User | null;
  failureLogin?: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
};

function userReducer(state: UserState = initialState, action: Actions) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.USER_LISTENING:
      return {
        ...state,
        loading: true,
      };
    case types.SET_USER:
      return {
        ...state,
        loading: false,
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
