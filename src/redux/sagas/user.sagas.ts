import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { UserActionTypes as types } from "../action-types/user.action-types";
import {
  userLoginSuccess,
  userLoginFailure,
  userListeningFailure,
  userListeningSuccess,
  setUser,
  unsetUser,
  logOutSuccess,
} from "../action-creators/user.action-creators";
import { UserActions } from "../actions/user.actions";
import * as db from "../../firebase/api/user.api";

export function* userLoginSaga(): SagaIterator {
  while (true) {
    yield take<UserActions>(types.USER_LOGIN_REQUEST);
    const data = yield call(db.signInWithGoogle);

    if (data.user) {
      yield put(setUser(data.user));
      yield put(userLoginSuccess());
      return;
    }
    yield put(userLoginFailure());
  }
}

export function* userListeningSaga(): SagaIterator {
  while (true) {
    const action = yield take<UserActions>(types.USER_LISTENING);
    if (action.payload) {
      yield put(setUser(action.payload));
      yield put(userListeningSuccess());
      return;
    }

    yield put(userListeningFailure());
  }
}

export function* userLogOut(): SagaIterator {
  while (true) {
    yield take<UserActions>(types.LOG_OUT);
    yield call(db.logOut);
    yield put(unsetUser());
    yield put(logOutSuccess());
  }
}
