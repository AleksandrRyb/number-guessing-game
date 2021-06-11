import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import { ProfileActions } from "../actions/profile.actions";
import type { Profile } from "../../types/profile.types";

interface ProfileState {
  profile: Profile | null;
  isFetchingProfile: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isFetchingProfile: false,
};

function profileReducer(
  state: ProfileState = initialState,
  action: ProfileActions
) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...state,
        isFetchingProfile: true,
      };
    case types.PROFILE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetchingProfile: false,
        profile: action.payload,
      };
    case types.PROFILE_REQUEST_FAILURE:
      return {
        ...state,
        isFetchingProfile: false,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        isFetchingProfile: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isFetchingProfile: false,
      };
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isFetchingProfile: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
