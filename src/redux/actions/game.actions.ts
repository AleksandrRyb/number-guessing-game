import { GameActionTypes as types } from "../action-types/game.action-types";
import { Profile } from "../../types/profile.types";

export interface CreateGameRequestAction {
  type: types.CREATE_GAME_REQUEST;
  payload: Profile;
}

export interface CreateGameSuccessAction {
  type: types.CREATE_GAME_SUCCESS;
  payload: string;
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

export type GameActions =
  | CreateGameRequestAction
  | CreateGameFailureAction
  | CreateGameSuccessAction
  | JoinToGameRequestAction
  | JoinToGameSuccessAction
  | JoinToGameFailureAction;
