import { Profile } from "./profile.types";

export type Game = {
  id: string;
  owner: Profile;
  stages: "creating" | "in-progress" | "done" | "closed";
  gameState: GameState;
  created: Date;
};

export type GameSnapshot = {
  owner: Profile;
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

export interface IPlayer {
  player: Player;
}

export type GameState = {
  currentPlayer: Player;
  nextPlayer: Player;
  isEven: boolean | null;
};
