import { InviteActionTypes as types } from "../action-types/invite.action-types";
import * as actions from "../actions/invite.actions";
import { Invite } from "../../types/invite.types";
import { Profile } from "../../types/profile.types";

export function inviteSend(
  sendFrom: Profile,
  sendFromId: string,
  sendTo: string,
  gameId: string,
  message: string
): actions.InviteSendAction {
  return {
    type: types.INVITE_SEND,
    payload: { sendFrom, sendFromId, sendTo, gameId, message },
  };
}

export function inviteSendSuccess(
  message: string
): actions.InviteSendSuccessAction {
  return {
    type: types.INVITE_SEND_SUCCESS,
    payload: message,
  };
}

export function inviteSendFailure(
  error: string
): actions.InviteSendFailureAction {
  return {
    type: types.INVITE_SEND_FAILURE,
    payload: error,
  };
}

export function setDefaultInviteSending(): actions.SetDefaultInviteSendingAction {
  return {
    type: types.SET_DEFAULT_INVITE_SENDING,
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
  gameId: string | null
): actions.InviteReplyAction {
  return {
    type: types.INVITE_REPLY,
    payload: { inviteId, joined, gameId },
  };
}

export function inviteReplySuccess(
  gameId: string
): actions.InviteReplySuccessAction {
  return {
    type: types.INVITE_REPLY_SUCCESS,
    payload: gameId,
  };
}

export function inviteReplyFailure(): actions.InviteReplyFailureAction {
  return {
    type: types.INVITE_REPLY_FAILURE,
  };
}

export function clearGameRedirection(): actions.ClearGameRedirectionAction {
  return {
    type: types.CLEAR_GAME_REDIRECTION,
  };
}
