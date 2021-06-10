import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import type {
  ProfileRequestAction,
  GetProfileAction,
  UpdateProfileAction,
} from "../actions/profile.actions";
import type { Profile } from "../../types/profile.types";

export function profileRequest(user: firebase.User): ProfileRequestAction {
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
  isWinner: boolean
): UpdateProfileAction {
  return {
    type: types.UPDATE_PROFILE,
    payload: { profileId, isWinner },
  };
}
