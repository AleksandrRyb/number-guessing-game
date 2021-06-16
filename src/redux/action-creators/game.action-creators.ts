import { GameActionTypes as types } from "../action-types/game.action-types";
import { Profile } from "../../types/profile.types";
import { Player, Game } from "../../types/game.types";
import * as actions from "../actions/game.actions";

export function createGameRequest(
  profile: Profile
): actions.CreateGameRequestAction {
  return {
    type: types.CREATE_GAME_REQUEST,
    payload: profile,
  };
}

export function createGameSuccess(game: Game): actions.CreateGameSuccessAction {
  return {
    type: types.CREATE_GAME_SUCCESS,
    payload: game,
  };
}

export function createGameFailure(): actions.CreateGameFailureAction {
  return {
    type: types.CREATE_GAME_FAILURE,
  };
}

export function joinToGameRequest(
  profile: Profile,
  gameId: string
): actions.JoinToGameRequestAction {
  return {
    type: types.JOIN_TO_GAME_REQUEST,
    payload: { profile, gameId },
  };
}

export function joinToGameSuccess(): actions.JoinToGameSuccessAction {
  return {
    type: types.JOIN_TO_GAME_SUCCESS,
  };
}

export function joinToGameFailure(): actions.JoinToGameFailureAction {
  return {
    type: types.JOIN_TO_GAME_FAILURE,
  };
}

export function subscribeToPlayersRequest(
  players: Player[]
): actions.SubscribeToPlayersRequestAction {
  return {
    type: types.SUBSCRIBE_TO_PLAYERS_REQUEST,
    payload: players,
  };
}

export function subscribeToPlayersSuccess(
  players: Player[]
): actions.SubscribeToPlayersSuccessAction {
  return {
    type: types.SUBSCRIBE_TO_PLAYERS_SUCCESS,
    payload: players,
  };
}

export function subscribeToPlayersFailure(): actions.SubscribeToPlayersFailureAction {
  return {
    type: types.SUBSCRIBE_TO_PLAYERS_FAILURE,
  };
}
