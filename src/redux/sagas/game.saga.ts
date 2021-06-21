import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import {
  findGameLeaders,
  findTotalMovePoints,
} from "../../helpers/game.helpers";

import { GameActionTypes as types } from "../action-types/game.action-types";
import * as actionCreators from "../action-creators/game.action-creators";
import { clearGameRedirection } from "../action-creators/invite.action-creators";
import * as db from "../../firebase/api/game.api";

export function* gameCreateSaga(): SagaIterator {
  while (true) {
    const { payload: profile } = yield take(types.CREATE_GAME_REQUEST);
    const response = yield call(db.createGame, profile);

    if (response) {
      yield put(actionCreators.createGameSuccess(response));
    } else {
      yield put(actionCreators.createGameFailure());
    }
  }
}

export function* joinToGameSaga(): SagaIterator {
  while (true) {
    const {
      payload: { profile, gameId },
    } = yield take(types.JOIN_TO_GAME_REQUEST);
    yield put(clearGameRedirection());
    const response = yield call(db.addPlayerToGame, profile, gameId);

    if (response) {
      yield put(actionCreators.joinToGameSuccess());
    } else {
      yield put(actionCreators.joinToGameFailure());
    }
  }
}

export function* subscribeToPlayersSaga(): SagaIterator {
  while (true) {
    const { payload: players } = yield take(types.SUBSCRIBE_TO_PLAYERS_REQUEST);

    if (players) {
      yield put(actionCreators.subscribeToPlayersSuccess(players));
    } else {
      yield put(actionCreators.subscribeToPlayersFailure());
    }
  }
}

export function* subscribeToGameSaga(): SagaIterator {
  while (true) {
    const { payload: game } = yield take(types.SUBSCRIBE_TO_GAME_REQUEST);

    if (game) {
      yield put(actionCreators.subscribeToGameSuccess(game));
    } else {
      yield put(actionCreators.subscribeToGameFailure());
    }
  }
}

export function* updateGameStateSaga(): SagaIterator {
  while (true) {
    const {
      payload: { gameId, gameState },
    } = yield take(types.UPDATE_GAME_STATE_REQUEST);
    const players = yield call(db.getAllPlayers, gameId);
    const totalMovePoints = findTotalMovePoints(players);
    const leaders = findGameLeaders(players);

    //Check if players movepoints are 0, if so and more than 1 player
    //have a biggest count of point we set them to  continue play
    //this cond should work only once
    if (
      leaders.length > 1 &&
      totalMovePoints === 0 &&
      gameState.isEven === null
    ) {
      const newGameState = {
        currentPlayer: leaders[0],
        nextPlayer: leaders[1],
        isEven: null,
      };
      const response = yield call(db.updateGameState, gameId, newGameState);

      if (response) {
        yield put(actionCreators.updateGameStateSuccess());
      } else {
        yield put(actionCreators.updateGameStateFailure());
      }

      //Check if we have only one favorite player
      //If so set him as a winner
    } else if (leaders.length === 1 && totalMovePoints <= 0) {
      yield call(db.setWinner, players[0]?.gameId);

      //Otherweise we just set new gameState
    } else {
      const response = yield call(db.updateGameState, gameId, gameState);

      if (response) {
        yield put(actionCreators.updateGameStateSuccess());
      } else {
        yield put(actionCreators.updateGameStateFailure());
      }
    }
  }
}

export function* updatePlayersSaga(): SagaIterator {
  while (true) {
    const {
      payload: { currentPlayer, nextPlayer, newGameState },
    } = yield take(types.UPDATE_PLAYER_REQUEST);
    //Minus 1 movepoint from guesse maker
    //@ts-ignore
    yield call(db.updatePlayer, currentPlayer.gameId, currentPlayer.id, {
      movePoints: currentPlayer.movePoints,
    });

    //Increase or decrease guess points of guesser player
    const response = yield call(
      //@ts-ignore
      db.updatePlayer,
      nextPlayer.gameId,
      nextPlayer.id,
      {
        guessed: nextPlayer.guessed,
      }
    );

    if (response) {
      yield put(
        actionCreators.updateGameStateRequest(nextPlayer.gameId, newGameState)
      );
      yield put(actionCreators.updatePlayersSuccess());
    } else {
      yield put(actionCreators.updatePlayersFailure());
    }
  }
}
