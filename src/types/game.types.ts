import { Profile } from "./profile.types";

export type Game = {
  id: string;
  owner: Profile;
  gameState: "creating" | "started" | "done";
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
