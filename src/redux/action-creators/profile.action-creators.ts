import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import {
  ProfileRequestAction,
  GetProfileAction,
  UpdateProfileAction,
  CreateProfileAction,
  Profile,
} from "../actions/profile.actions";

export function profileRequestAction(
  user: firebase.User
): ProfileRequestAction {
  return {
    type: types.PROFILE_REQUEST,
    payload: user,
  };
}

export function getProfile(profile: Profile): GetProfileAction {
  return {
    type: types.GET_PROFILE,
    payload: profile,
  };
}

export function updateProfile(
  profileId: string,
  result: "win" | "lose"
): UpdateProfileAction {
  return {
    type: types.UPDATE_PROFILE,
  };
}

export function createProfile(profile: Profile): CreateProfileAction {
  return {
    type: types.CREATE_PROFILE,
    payload: profile,
  };
}
