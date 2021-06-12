import { InviteActionTypes as types } from "../action-types/invite.action-types";
import { Invite } from "../../types/invite.types";
import { Profile } from "../../types/profile.types";

export interface InviteSendAction {
  type: types.INVITE_SEND;
  payload: {
    sendFrom: Profile;
    sendTo: string;
    gameUrl: string;
    message: string;
  };
}

export interface InviteSendSuccessAction {
  type: types.INVITE_SEND_SUCCESS;
}

export interface InviteSendFailureAction {
  type: types.INVITE_SEND_FAILURE;
}

export interface InviteReceiveAction {
  type: types.INVITE_RECIEVE;
  payload: Invite;
}

export interface InviteReceiveSuccessAction {
  type: types.INVITE_RECIEVE_SUCCESS;
  payload: Invite;
}

export interface InviteReceiveFailureAction {
  type: types.INVITE_RECIEVE_FAILURE;
}

export interface InviteReplyAction {
  type: types.INVITE_REPLY;
  payload: { inviteId: string; joined: boolean };
}

export interface InviteReplySuccessAction {
  type: types.INVITE_REPLY_SUCCESS;
}

export interface InviteReplyFailureAction {
  type: types.INVITE_REPLY_FAILURE;
}

export type InviteActions =
  | InviteSendAction
  | InviteSendSuccessAction
  | InviteSendFailureAction
  | InviteReceiveAction
  | InviteReceiveSuccessAction
  | InviteReceiveFailureAction
  | InviteReplyAction
  | InviteReplySuccessAction
  | InviteReplyFailureAction;
