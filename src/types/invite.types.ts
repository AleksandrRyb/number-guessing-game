import { Profile } from "./profile.types";

export type Invite = {
  id: string;
  sendFrom: Profile;
  sendToEmail: string;
  gameUrl: string;
  message: string;
  joined: boolean;
  isReceived: boolean;
  created: Date;
};
