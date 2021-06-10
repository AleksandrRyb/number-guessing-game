import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import type { Profile } from "../../types/profile.types";

export interface GetProfileAction {
  type: types.GET_PROFILE;
  payload: Profile;
}

export interface UpdateProfileAction {
  type: types.UPDATE_PROFILE;
  payload: { profileId: string; isWinner: boolean };
}

export interface ProfileRequestAction {
  type: types.PROFILE_REQUEST;
  payload: firebase.User;
}

export type ProfileActions =
  | GetProfileAction
  | UpdateProfileAction
  | ProfileRequestAction;
