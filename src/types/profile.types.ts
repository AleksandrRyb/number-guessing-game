export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  email: string;
  wins: number;
  loses: number;
  currentGame: string;
  created: Date;
};

export type IProfile = {
  profile: Profile | null;
};
