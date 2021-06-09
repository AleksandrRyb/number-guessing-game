import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";

export type Profile = {
  userId: string;
  name: string;
  avatar: string;
  email: string;
  wins: number;
  loses: number;
};

export interface GetProfileAction {
  type: types.GET_PROFILE;
  payload: Profile;
}

export interface CreateProfileAction {
  type: types.CREATE_PROFILE;
  payload: Profile;
}

export interface UpdateProfileAction {
  type: types.UPDATE_PROFILE;
}

export interface ProfileRequestAction {
  type: types.PROFILE_REQUEST;
  payload: firebase.User;
}

export type ProfileActions =
  | GetProfileAction
  | CreateProfileAction
  | UpdateProfileAction
  | ProfileRequestAction;
