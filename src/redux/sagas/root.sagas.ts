import { all } from "redux-saga/effects";

import { userLoginSaga, userListeningSaga, userLogOut } from "./user.sagas";
import { getProfileSaga, updateProfileSaga } from "./profile.sagas";
import {
  inviteSendSaga,
  inviteReceiveSaga,
  inviteReplySaga,
} from "./invite.sagas";
import {
  gameCreateSaga,
  joinToGameSaga,
  subscribeToPlayersSaga,
  subscribeToGameSaga,
  gameStartSaga,
} from "./game.saga";

export function* rootSaga() {
  try {
    yield all([
      userLoginSaga(),
      userListeningSaga(),
      userLogOut(),
      getProfileSaga(),
      updateProfileSaga(),
      gameCreateSaga(),
      joinToGameSaga(),
      inviteSendSaga(),
      inviteReceiveSaga(),
      inviteReplySaga(),
      subscribeToPlayersSaga(),
      subscribeToGameSaga(),
      gameStartSaga(),
    ]);
  } catch (error) {
    console.log("→ error caught", error);
  }
}
