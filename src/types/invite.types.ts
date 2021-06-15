import { Profile } from "./profile.types";

export type Invite = {
  id: string;
  sendFrom: Profile;
  sendTo: string;
  gameUrl: string;
  message: string;
  joined: boolean;
  isReceived: boolean;
  created: Date;
};

export type SnapshotInvite = {
  sendFrom: Profile;
  sendTo: string;
  gameUrl: string;
  message: string;
  joined: boolean;
  isReceived: boolean;
  created: Date;
};
