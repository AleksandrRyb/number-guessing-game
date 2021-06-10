import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import { getProfile } from "../action-creators/profile.action-creators";
import { ProfileActions } from "../actions/profile.actions";
import * as db from "../../firebase/api/profile.api";

export function* getProfileSaga(): SagaIterator {
  while (true) {
    const action = yield take<ProfileActions>(types.PROFILE_REQUEST);
    const profile = yield call(db.getProfile, action.payload);
    yield put(getProfile(profile));
  }
}

export function* updateProfileSaga(): SagaIterator {
  while (true) {
    const {
      payload: { profileId, isWinner },
    } = yield take<ProfileActions>(types.UPDATE_PROFILE);
    yield call(db.updateProfile, profileId, isWinner);
  }
}
