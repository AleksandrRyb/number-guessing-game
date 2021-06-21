import { GameActionTypes as types } from "../action-types/game.action-types";
import { GameActions } from "../actions/game.actions";
import { Game, Player } from "../../types/game.types";

interface GameRoomState {
  game: Game | null;
  isFetchingGame: boolean;
  players: Player[] | [];
  isJoiningGame: boolean;
  isPlayersListening: boolean;
  isListeningGame: boolean;
  isGameStateUpdating: boolean;
  isPlayerUpdating: boolean;
}

const initialState = {
  game: null,
  isFetchingGame: false,
  players: [],
  isJoiningGame: false,
  isPlayersListening: true,
  isListeningGame: true,
  isGameStateUpdating: false,
  isPlayerUpdating: false,
};

function gameReducer(state: GameRoomState = initialState, action: GameActions) {
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
        isPlayersListening: false,
        isJoiningGame: true,
      };
    case types.JOIN_TO_GAME_SUCCESS:
      return {
        ...state,
        isPlayersListening: true,
        isJoiningGame: false,
      };
    case types.JOIN_TO_GAME_FAILURE:
      return {
        ...state,
        isJoiningGame: false,
      };
    case types.SUBSCRIBE_TO_PLAYERS_REQUEST:
      return {
        ...state,
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
    case types.SUBSCRIBE_TO_GAME_REQUEST:
      return {
        ...state,
      };
    case types.SUBSCRIBE_TO_GAME_SUCCESS: {
      return {
        ...state,
        game: action.payload,
      };
    }
    case types.SUBSCRIBE_TO_GAME_FAILURE: {
      return {
        ...state,
      };
    }
    case types.UPDATE_GAME_STATE_REQUEST: {
      return {
        ...state,
        isListeningGame: false,
        isGameStateUpdating: true,
      };
    }
    case types.UPDATE_GAME_STATE_SUCCESS: {
      return {
        ...state,
        isListeningGame: true,
        isGameStateUpdating: false,
      };
    }
    case types.UPDATE_GAME_STATE_FAILURE: {
      return {
        ...state,
        isListeningGame: true,
        isGameStateUpdating: false,
      };
    }
    case types.UPDATE_PLAYER_REQUEST: {
      return {
        ...state,
        isPlayersListening: false,
        isPlayerUpdating: true,
      };
    }
    case types.UPDATE_PLAYER_SUCCESS: {
      return {
        ...state,
        isPlayersListening: true,
        isPlayerUpdating: false,
      };
    }

    case types.UPDATE_PLAYER_FAILURE: {
      return {
        ...state,
        isPlayersListening: true,
        isPlayerUpdating: false,
      };
    }

    case types.LEAVE_GAME: {
      return {
        game: null,
        isFetchingGame: false,
        players: [],
        isJoiningGame: false,
        isPlayersListening: true,
        isListeningGame: true,
        isGameStateUpdating: false,
        isPlayerUpdating: false,
      };
    }
    default:
      return state;
  }
}

export default gameReducer;
