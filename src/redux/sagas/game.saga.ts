//@ts-nocheck
import { eventChannel } from "redux-saga";
import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { PlayerSnapshot } from "../../types/game.types";

import { GameActionTypes as types } from "../action-types/game.action-types";
import * as actionCreators from "../action-creators/game.action-creators";
import { GameActions } from "../actions/game.actions";
import * as db from "../../firebase/api/game.api";

export function* gameCreateSaga(): SagaIterator {
  while (true) {
    const { payload: profile } = yield take(types.CREATE_GAME_REQUEST);
    const response = yield call(db.createGame, profile);

    if (response) {
      yield put(actionCreators.createGameSuccess(response));
      return;
    }

    yield put(actionCreators.createGameFailure());
  }
}

export function* joinToGameSaga(): SagaIterator {
  while (true) {
    const {
      payload: { profile, gameId },
    } = yield take(types.JOIN_TO_GAME_REQUEST);
    const response = yield call(db.addPlayerToGame, profile, gameId);

    if (response) {
      yield put(actionCreators.joinToGameSuccess());
      return;
    }

    yield put(actionCreators.joinToGameFailure());
  }
}

export function* subscribeToPlayersSaga(): SagaIterator {
  while (true) {
    const { payload: players } = yield take(types.SUBSCRIBE_TO_PLAYERS_REQUEST);
    if (!players) {
      yield put(actionCreators.subscribeToPlayersFailure());
      return;
    }
    yield put(actionCreators.subscribeToPlayersSuccess(players));
  }
}

export function* subscribeToGameSaga(): SagaIterator {
  while (true) {
    const { payload: game } = yield take(types.SUBSCRIBE_TO_GAME_REQUEST);
    if (!game) {
      yield put(actionCreators.subscribeToGameFailure());
      break;
    }

    yield put(actionCreators.subscribeToGameSuccess(game));
  }
}

export function* updateGameStateSaga(): SagaIterator {
  while (true) {
    const {
      payload: { gameId, gameState },
    } = yield take(types.UPDATE_GAME_STATE_REQUEST);
    console.log(gameState);

    const response = yield call(db.updateGameState, gameId, gameState);

    if (!response) {
      yield put(actionCreators.updateGameStateFailure());
      return;
    }

    yield put(actionCreators.updateGameStateSuccess());
  }
}
