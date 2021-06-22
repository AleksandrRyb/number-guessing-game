import { Profile } from "./profile.types";

export type Invite = {
  id: string;
  sendFrom: Profile;
  sendFromId: string;
  sendTo: string;
  gameId: string;
  message: string;
  joined: boolean;
  isReceived: boolean;
  created: Date;
};

export type SnapshotInvite = {
  sendFrom: Profile;
  sendFromId: string;
  sendTo: string;
  gameId: string;
  message: string;
  joined: boolean;
  isReceived: boolean;
  created: Date;
};
