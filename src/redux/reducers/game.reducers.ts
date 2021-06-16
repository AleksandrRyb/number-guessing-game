import { GameActionTypes as types } from "../action-types/game.action-types";
import { GameActions } from "../actions/game.actions";
import { Game, Player } from "../../types/game.types";

interface GameState {
  game: Game | null;
  isFetchingGame: boolean;
  players: Player[] | [];
  isPlayersListening: boolean;
  isJoininigGame: boolean;
}

const initialState = {
  game: null,
  isFetchingGame: false,
  players: [],
  isPlayersListening: true,
  isJoininigGame: false,
};

function gameReducer(state: GameState = initialState, action: GameActions) {
  switch (action.type) {
    case types.CREATE_GAME_REQUEST:
      return {
        ...state,
        isFetchingGame: true,
      };
    case types.CREATE_GAME_SUCCESS:
      return {
        ...state,
        game: action.payload,
        isFetchingGame: false,
      };
    case types.CREATE_GAME_FAILURE:
      return {
        ...state,
        isFetchingGame: false,
      };
    case types.JOIN_TO_GAME_REQUEST:
      return {
        ...state,
        isJoininigGame: true,
      };
    case types.JOIN_TO_GAME_SUCCESS:
      return {
        ...state,
        isJoininigGame: false,
      };
    case types.JOIN_TO_GAME_FAILURE:
      return {
        ...state,
        isJoininigGame: false,
      };
    case types.SUBSCRIBE_TO_PLAYERS_REQUEST:
      return {
        ...state,
        isPlayersListening: true,
      };
    case types.SUBSCRIBE_TO_PLAYERS_SUCCESS:
      return {
        ...state,
        players: [...action.payload],
        isPlayersListening: false,
      };
    case types.SUBSCRIBE_TO_PLAYERS_FAILURE:
      return {
        ...state,
        isPlayersListening: false,
      };
    default:
      return state;
  }
}

export default gameReducer;
