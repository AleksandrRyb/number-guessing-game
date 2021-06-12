import { all } from "redux-saga/effects";

import { userLoginSaga, userListeningSaga, userLogOut } from "./user.sagas";
import { getProfileSaga, updateProfileSaga } from "./profile.sagas";

export function* rootSaga() {
  try {
    yield all([
      userLoginSaga(),
      userListeningSaga(),
      userLogOut(),
      getProfileSaga(),
      updateProfileSaga(),
    ]);
  } catch (error) {
    console.log("→ error caught", error);
  }
}
