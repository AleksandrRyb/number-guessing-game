import { Profile } from "./profile.types";

export type Game = {
  id: string;
  owner: Profile;
  winner: null | Player;
  stages: "creating" | "in-progress" | "done" | "closed";
  gameState: GameState;
  created: Date;
};

export type GameSnapshot = {
  owner: Profile;
  winner: null | Player;
  stages: "creating" | "in-progress" | "done" | "closed";
  gameState: GameState;
  created: Date;
};

export type PlayerSnapshot = {
  profileId: string;
  profile: Profile;
  gameId: string;
  created: Date;
  movePoints: number;
  guessed: number;
};

export type Player = {
  id: string;
  profileId: string;
  profile: Profile;
  gameId: string;
  created: Date;
  movePoints: number;
  guessed: number;
};

export type GameState = {
  currentPlayer: Player;
  nextPlayer: Player;
  isEven: boolean | null;
};

//COMPONENTS PROPS TYPES
export interface IPlayer {
  player: Player;
  currentPlayerId: string | undefined;
  nextPlayerId: string | undefined;
}

export type IGuessingForm = {
  isPlayerUpdating: boolean;
  handleGuessIsEven: (isEven: boolean) => void;
  isEven: boolean | null | undefined;
  isGameStateUpdating: boolean;
};

export type IInviteForm = {
  openInvitePopover: boolean;
  setOpenInvitePopover: (arg: boolean) => void;
  handleInviteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inviteForm: { email: string; message: string };
  handleInviteSubmit: () => void;
  isSendingInvite: boolean;
};

export type ILoserForm = {
  f7router: any;
  setCloseGamePopover: (arg: false) => void;
};

export type IMakeGuessForm = {
  isGameStateUpdating: boolean;
  handleGuessingNumberChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleGuessingNumberSumbit: () => void;
  isEven: boolean | null | undefined;
};

export type IWinnerForm = {
  setCloseGamePopover: (arg: false) => void;
  player: Player | null | undefined;
  f7router: any;
};
