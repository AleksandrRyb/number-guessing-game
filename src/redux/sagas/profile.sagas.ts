import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { ProfileActionTypes as types } from "../action-types/profile.action-types";
import * as actionCreators from "../action-creators/profile.action-creators";
import { ProfileActions } from "../actions/profile.actions";
import * as db from "../../firebase/api/profile.api";

export function* getProfileSaga(): SagaIterator {
  while (true) {
    const action = yield take<ProfileActions>(types.PROFILE_REQUEST);
    const profile = yield call(db.getProfile, action.payload);

    if (profile) {
      yield put(actionCreators.profileRequestSuccess(profile));
    } else {
      yield put(actionCreators.profileRequestFailure(profile));
    }
  }
}

export function* updateProfileSaga(): SagaIterator {
  while (true) {
    const {
      payload: { profileId, isWinner },
    } = yield take<ProfileActions>(types.UPDATE_PROFILE);
    const updated = yield call(db.updateProfile, profileId, isWinner);

    if (updated) {
      yield put(actionCreators.updateProfileSuccess());
    } else {
      yield put(actionCreators.updateProfileFailure());
    }
  }
}
