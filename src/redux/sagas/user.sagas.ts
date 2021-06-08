import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { UserActionTypes as types } from "../action-types/user.action-types";
import {
  userLoginSuccess,
  userLoginFailure,
  setUser,
} from "../action-creators/user.action-creators";
import { Actions } from "../actions/user.actions";
import * as db from "../../firebase/api/user.api";

export function* userLoginSaga(): SagaIterator {
  while (true) {
    yield take<Actions>(types.USER_LOGIN_REQUEST);
    const data = yield call(db.signInWithGoogle);

    if (data.user) {
      return yield put(userLoginSuccess(data.user));
    }
    yield put(userLoginFailure());
  }
}

export function* userListeningSaga(): SagaIterator {
  while (true) {
    const action = yield take<Actions>(types.USER_LISTENING);
    yield put(setUser(action.payload));
  }
}

export function* userLogOut(): SagaIterator {
  while (true) {
    yield take<Actions>(types.LOG_OUT);
    yield call(db.logOut);
  }
}
