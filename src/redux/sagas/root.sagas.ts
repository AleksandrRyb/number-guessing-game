import { all } from "redux-saga/effects";

import { userLoginSaga, userListeningSaga, userLogOut } from "./user.sagas";

export function* rootSaga() {
  try {
    yield all([userLoginSaga(), userListeningSaga(), userLogOut()]);
  } catch (error) {
    console.log("→ error caught", error);
  }
}
