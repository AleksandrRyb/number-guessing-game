import { InviteActionTypes as types } from "../action-types/invite.action-types";
import * as actions from "../actions/invite.actions";
import { Invite } from "../../types/invite.types";
import { Profile } from "../../types/profile.types";

export function inviteSend(
  sendFrom: Profile,
  sendTo: string,
  gameUrl: string,
  message: string
): actions.InviteSendAction {
  return {
    type: types.INVITE_SEND,
    payload: { sendFrom, sendTo, gameUrl, message },
  };
}

export function inviteSendSuccess(): actions.InviteSendSuccessAction {
  return {
    type: types.INVITE_SEND_SUCCESS,
  };
}

export function inviteSendFailure(): actions.InviteSendFailureAction {
  return {
    type: types.INVITE_SEND_FAILURE,
  };
}

export function inviteReceive(invite: Invite): actions.InviteReceiveAction {
  return {
    type: types.INVITE_RECIEVE,
    payload: invite,
  };
}

export function inviteReceiveSuccess(
  invite: Invite
): actions.InviteReceiveSuccessAction {
  return {
    type: types.INVITE_RECIEVE_SUCCESS,
    payload: invite,
  };
}

export function inviteReceiveFailure(): actions.InviteReceiveFailureAction {
  return {
    type: types.INVITE_RECIEVE_FAILURE,
  };
}

export function inviteReply(
  inviteId: string,
  joined: boolean,
  gameUrl: string | null
): actions.InviteReplyAction {
  return {
    type: types.INVITE_REPLY,
    payload: { inviteId, joined, gameUrl },
  };
}

export function inviteReplySuccess(
  gameUrl: string
): actions.InviteReplySuccessAction {
  return {
    type: types.INVITE_REPLY_SUCCESS,
    payload: gameUrl,
  };
}

export function inviteReplyFailure(): actions.InviteReplyFailureAction {
  return {
    type: types.INVITE_REPLY_FAILURE,
  };
}
