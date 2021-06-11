import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import type { Profile } from "../../types/profile.types";

export interface UpdateProfileAction {
  type: types.UPDATE_PROFILE;
  payload: { profileId: string; isWinner: boolean };
}

export interface UpdateProfileSuccessAction {
  type: types.UPDATE_PROFILE_SUCCESS;
  payload: Profile;
}

export interface UpdateProfileFailureAction {
  type: types.UPDATE_PROFILE_FAILURE;
}

export interface ProfileRequestAction {
  type: types.PROFILE_REQUEST;
  payload: firebase.User;
}

export interface ProfileRequestSuccessAction {
  type: types.PROFILE_REQUEST_SUCCESS;
  payload: Profile;
}

export interface ProfileRequestFailureAction {
  type: types.PROFILE_REQUEST_FAILURE;
}

export type ProfileActions =
  | UpdateProfileAction
  | UpdateProfileFailureAction
  | UpdateProfileSuccessAction
  | ProfileRequestAction
  | ProfileRequestFailureAction
  | ProfileRequestSuccessAction;
