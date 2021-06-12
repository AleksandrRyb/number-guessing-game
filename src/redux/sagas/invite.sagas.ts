import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { InviteActionTypes as types } from "../action-types/invite.action-types";
import * as actionCreators from "../action-creators/invite.action-creators";
import { InviteActions } from "../actions/invite.actions";
import * as db from "../../firebase/api/invite.api";

export function* sendInviteSaga(): SagaIterator {
  while (true) {
    const {
      payload: { sendFrom, sendTo, gameUrl, message },
    } = yield take(types.INVITE_SEND);
    const response = yield call(
      db.createInvite,
      sendFrom,
      sendTo,
      gameUrl,
      message
    );

    if (response) {
      yield put(actionCreators.inviteSendSuccess());
      return;
    }

    yield put(actionCreators.inviteSendFailure());
  }
}
