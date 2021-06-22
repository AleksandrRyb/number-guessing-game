import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { UserActionTypes as types } from "../action-types/user.action-types";
import * as actionCreators from "../action-creators/user.action-creators";
import { UserActions } from "../actions/user.actions";
import * as db from "../../firebase/api/user.api";

export function* userLoginSaga(): SagaIterator {
  while (true) {
    yield take<UserActions>(types.USER_LOGIN_REQUEST);
    const data = yield call(db.signInWithGoogle);

    if (data.user) {
      yield put(actionCreators.setUser(data.user));
      yield put(actionCreators.userLoginSuccess());
    } else {
      yield put(actionCreators.userLoginFailure());
    }
  }
}

export function* userListeningSaga(): SagaIterator {
  while (true) {
    const action = yield take<UserActions>(types.USER_LISTENING);
    if (action.payload) {
      yield put(actionCreators.setUser(action.payload));
      yield put(actionCreators.userListeningSuccess());
    } else {
      yield put(actionCreators.userListeningFailure());
    }
  }
}

export function* userLogOut(): SagaIterator {
  while (true) {
    yield take<UserActions>(types.LOG_OUT);
    yield call(db.logOut);
    yield put(actionCreators.unsetUser());
    yield put(actionCreators.logOutSuccess());
  }
}
