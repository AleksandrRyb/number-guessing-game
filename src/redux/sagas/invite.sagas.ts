import { take, put, call } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { InviteActionTypes as types } from "../action-types/invite.action-types";
import * as actionCreators from "../action-creators/invite.action-creators";
import * as db from "../../firebase/api/invite.api";

export function* inviteSendSaga(): SagaIterator {
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
    } else {
      yield put(actionCreators.inviteSendFailure());
    }
  }
}

export function* inviteReceiveSaga(): SagaIterator {
  while (true) {
    const { payload: invite } = yield take(types.INVITE_RECIEVE);

    if (invite) {
      yield put(actionCreators.inviteReceiveSuccess(invite));
    } else {
      yield put(actionCreators.inviteReceiveFailure());
    }
  }
}

export function* inviteReplySaga(): SagaIterator {
  while (true) {
    const {
      payload: { inviteId, joined, gameUrl },
    } = yield take(types.INVITE_REPLY);

    const response = yield call(db.replyToInvite, inviteId, joined);

    if (response) {
      yield put(actionCreators.inviteReplySuccess(gameUrl));
    } else {
      yield put(actionCreators.inviteReplyFailure());
    }
  }
}
