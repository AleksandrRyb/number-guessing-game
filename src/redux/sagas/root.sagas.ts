import { all } from "redux-saga/effects";

import { userLoginSaga, userListeningSaga, userLogOut } from "./user.sagas";
import { getProfileSaga } from "./profile.sagas";

export function* rootSaga() {
  try {
    yield all([
      userLoginSaga(),
      userListeningSaga(),
      userLogOut(),
      getProfileSaga(),
    ]);
  } catch (error) {
    console.log("→ error caught", error);
  }
}
