import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import { ProfileActions } from "../actions/profile.actions";
import type { Profile } from "../../types/profile.types";
import firebase from "firebase";

interface ProfileState {
  profile: Profile | null;
  isFetchingProfile: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isFetchingProfile: false,
};

function profileReducer(state = initialState, action: ProfileActions) {
  switch (action.type) {
    case types.PROFILE_REQUEST:
      return {
        ...state,
        isFetchingProfile: true,
      };
    case types.GET_PROFILE:
      return {
        ...state,
        isFetchingProfile: false,
        profile: action.payload,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default profileReducer;
