import firebase from "firebase/app";
import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import type {
  ProfileRequestAction,
  ProfileRequestSuccessAction,
  ProfileRequestFailureAction,
  UpdateProfileAction,
  UpdateProfileFailureAction,
  UpdateProfileSuccessAction,
} from "../actions/profile.actions";
import type { Profile } from "../../types/profile.types";

export function profileRequest(user: firebase.User): ProfileRequestAction {
  return {
    type: types.PROFILE_REQUEST,
    payload: user,
  };
}

export function profileRequestSuccess(
  profile: Profile
): ProfileRequestSuccessAction {
  return {
    type: types.PROFILE_REQUEST_SUCCESS,
    payload: profile,
  };
}

export function profileRequestFailure(
  profile: Profile
): ProfileRequestFailureAction {
  return {
    type: types.PROFILE_REQUEST_FAILURE,
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

export function updateProfileSuccess(): UpdateProfileSuccessAction {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
  };
}

export function updateProfileFailure(): UpdateProfileFailureAction {
  return {
    type: types.UPDATE_PROFILE_FAILURE,
  };
}
