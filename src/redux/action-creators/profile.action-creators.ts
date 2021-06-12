import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import * as actions from "../actions/profile.actions";
import { Profile } from "../../types/profile.types";

export function profileRequest(
  user: firebase.User
): actions.ProfileRequestAction {
  return {
    type: types.PROFILE_REQUEST,
    payload: user,
  };
}

export function profileRequestSuccess(
  profile: Profile
): actions.ProfileRequestSuccessAction {
  return {
    type: types.PROFILE_REQUEST_SUCCESS,
    payload: profile,
  };
}

export function profileRequestFailure(
  profile: Profile
): actions.ProfileRequestFailureAction {
  return {
    type: types.PROFILE_REQUEST_FAILURE,
  };
}

export function updateProfile(
  profileId: string,
  isWinner: boolean
): actions.UpdateProfileAction {
  return {
    type: types.UPDATE_PROFILE,
    payload: { profileId, isWinner },
  };
}

export function updateProfileSuccess(): actions.UpdateProfileSuccessAction {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
  };
}

export function updateProfileFailure(): actions.UpdateProfileFailureAction {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
  };
}
