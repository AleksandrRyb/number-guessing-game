import { GameActionTypes as types } from "../action-types/game.action-types";
import { Profile } from "../../types/profile.types";
import { Player, Game, GameState } from "../../types/game.types";

export interface CreateGameRequestAction {
  type: types.CREATE_GAME_REQUEST;
  payload: Profile;
}

export interface CreateGameSuccessAction {
  type: types.CREATE_GAME_SUCCESS;
  payload: Game;
}

export interface CreateGameFailureAction {
  type: types.CREATE_GAME_FAILURE;
}

export interface JoinToGameRequestAction {
  type: types.JOIN_TO_GAME_REQUEST;
  payload: { profile: Profile; gameId: string };
}
export interface JoinToGameSuccessAction {
  type: types.JOIN_TO_GAME_SUCCESS;
}

export interface JoinToGameFailureAction {
  type: types.JOIN_TO_GAME_FAILURE;
}

export interface SubscribeToPlayersRequestAction {
  type: types.SUBSCRIBE_TO_PLAYERS_REQUEST;
  payload: Player[];
}

export interface SubscribeToPlayersSuccessAction {
  type: types.SUBSCRIBE_TO_PLAYERS_SUCCESS;
  payload: Player[];
}

export interface SubscribeToPlayersFailureAction {
  type: types.SUBSCRIBE_TO_PLAYERS_FAILURE;
}

export interface SubscribeToGameRequestAction {
  type: types.SUBSCRIBE_TO_GAME_REQUEST;
  payload: Game;
}

export interface SubscribeToGameSuccessAction {
  type: types.SUBSCRIBE_TO_GAME_SUCCESS;
  payload: Game;
}

export interface SubscribeToGameFailureAction {
  type: types.SUBSCRIBE_TO_GAME_FAILURE;
}

export interface UpdateGameStateRequestAction {
  type: types.UPDATE_GAME_STATE_REQUEST;
  payload: { gameId: string; gameState: GameState };
}

export interface UpdateGameStateSuccessAction {
  type: types.UPDATE_GAME_STATE_SUCCESS;
}

export interface UpdateGameStateFailureAction {
  type: types.UPDATE_GAME_STATE_FAILURE;
}

export interface UpdatePlayersRequestAction {
  type: types.UPDATE_PLAYER_REQUEST;
  payload: {
    currentPlayer: Player;
    nextPlayer: Player;
    newGameState: GameState;
  };
}

export interface UpdatePlayersSuccessAction {
  type: types.UPDATE_PLAYER_SUCCESS;
}

export interface UpdatePlayersFailureAction {
  type: types.UPDATE_PLAYER_FAILURE;
}

export interface LeaveGameAction {
  type: types.LEAVE_GAME;
  payload: { gameId: string; playerId: string; profileId: string };
}

export type GameActions =
  | CreateGameRequestAction
  | CreateGameFailureAction
  | CreateGameSuccessAction
  | JoinToGameRequestAction
  | JoinToGameSuccessAction
  | JoinToGameFailureAction
  | SubscribeToPlayersRequestAction
  | SubscribeToPlayersSuccessAction
  | SubscribeToPlayersFailureAction
  | SubscribeToGameRequestAction
  | SubscribeToGameSuccessAction
  | SubscribeToGameFailureAction
  | UpdateGameStateRequestAction
  | UpdateGameStateSuccessAction
  | UpdateGameStateFailureAction
  | UpdatePlayersRequestAction
  | UpdatePlayersSuccessAction
  | UpdatePlayersFailureAction
  | LeaveGameAction;
