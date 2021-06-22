import { take, put, call, delay, select } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";

import { InviteActionTypes as types } from "../action-types/invite.action-types";
import * as actionCreators from "../action-creators/invite.action-creators";
import * as db from "../../firebase/api/invite.api";
import { RootState } from "../reducers";

const getInvite = (state: RootState) => state.invite;

export function* inviteSendSaga(): SagaIterator {
  while (true) {
    const {
      payload: { sendFrom, sendFromId, sendTo, gameId, message },
    } = yield take(types.INVITE_SEND);
    const response = yield call(
      db.createInvite,
      sendFrom,
      sendFromId,
      sendTo,
      gameId,
      message
    );

    if (response.error) {
      yield put(actionCreators.inviteSendFailure(response.error));
    } else {
      yield put(actionCreators.inviteSendSuccess(response.message));
    }
  }
}

export function* inviteReceiveSaga(): SagaIterator {
  while (true) {
    const { payload: invite } = yield take(types.INVITE_RECIEVE);
    const inviteState = yield select(getInvite);

    yield delay(1500);
    if (invite) {
      yield put(
        actionCreators.inviteReceiveSuccess(
          !inviteState.invite && !inviteState.inviteReplying
            ? invite
            : inviteState.invite
        )
      );
    } else {
      yield put(actionCreators.inviteReceiveFailure());
    }
  }
}

export function* inviteReplySaga(): SagaIterator {
  while (true) {
    const {
      payload: { inviteId, joined, gameId },
    } = yield take(types.INVITE_REPLY);

    const response = yield call(db.replyToInvite, inviteId, joined);

    if (response) {
      yield put(actionCreators.inviteReplySuccess(gameId));
    } else {
      yield put(actionCreators.inviteReplyFailure());
    }
  }
}
