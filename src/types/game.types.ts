import { Profile } from "./profile.types";

export type Game = {
  owner: Profile;
  gameState: "creating" | "started" | "done";
};
