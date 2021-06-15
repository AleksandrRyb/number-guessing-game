import { GameActionTypes as types } from "../action-types/game.action-types";
import { GameActions } from "../actions/game.actions";
import { Game } from "../../types/game.types";

interface GameState {
  gameId: string | null;
  game: Game | null;
  isFetchingGame: boolean;
}

const initialState = {
  gameId: null,
  game: null,
  isFetchingGame: false,
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
        gameId: action.payload,
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
      };
    case types.JOIN_TO_GAME_SUCCESS:
      return {
        ...state,
      };
    case types.JOIN_TO_GAME_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default gameReducer;
