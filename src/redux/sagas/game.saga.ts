import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { GameActionTypes as types } from "../action-types/game.action-types";
import * as actionCreators from "../action-creators/game.action-creators";
import { GameActions } from "../actions/game.actions";
import * as db from "../../firebase/api/game.api";

export function* gameCreateSaga(): SagaIterator {
  while (true) {
    const { payload: profile } = yield take(types.CREATE_GAME_REQUEST);
    const response = yield call(db.createGame, profile);

    if (!response) {
      yield put(actionCreators.createGameFailure());
      return;
    }

    yield put(actionCreators.createGameSuccess(response));
  }
}

export function* joinToGameSaga(): SagaIterator {
  while (true) {
    const {
      payload: { profile, gameId },
    } = yield take(types.JOIN_TO_GAME_REQUEST);
    const response = yield call(db.addPlayerToGame, profile, gameId);

    if (!response) {
      yield put(actionCreators.joinToGameFailure());
      return;
    }

    yield put(actionCreators.joinToGameSuccess());
  }
}
