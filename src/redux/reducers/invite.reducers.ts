import { InviteActionTypes as types } from "../action-types/invite.action-types";
import { InviteActions } from "../actions/invite.actions";
import { Invite } from "../../types/invite.types";

interface InviteState {
  isSendingInvite: boolean;
  inviteSendSuccess: string | null;
  inviteSendFailure: string | null;
  isListeningInvites: boolean;
  inviteReplying: boolean;
  invite: Invite | null;
  gameToRedirect: string | null;
}

const initialState: InviteState = {
  isSendingInvite: false,
  inviteSendSuccess: null,
  inviteSendFailure: null,
  isListeningInvites: true,
  inviteReplying: false,
  invite: null,
  gameToRedirect: null,
};

function inviteReducer(
  state: InviteState = initialState,
  action: InviteActions
) {
  switch (action.type) {
    case types.INVITE_SEND:
      return {
        ...state,
        isSendingInvite: true,
        inviteSendSuccess: null,
        inviteSendFailure: null,
      };
    case types.INVITE_SEND_SUCCESS:
      return {
        ...state,
        isSendingInvite: false,
        inviteSendSuccess: action.payload,
      };
    case types.INVITE_SEND_FAILURE:
      return {
        ...state,
        isSendingInvite: false,
        inviteSendFailure: action.payload,
      };
    case types.SET_DEFAULT_INVITE_SENDING:
      return {
        ...state,
        inviteSendSuccess: null,
        inviteSendFailure: null,
      };
    case types.INVITE_RECIEVE:
      return {
        ...state,
      };
    case types.INVITE_RECIEVE_SUCCESS:
      return {
        ...state,
        invite: action.payload,
        isListeningInvites: false,
      };
    case types.INVITE_RECIEVE_FAILURE:
      return {
        ...state,
        isListeningInvites: true,
      };
    case types.INVITE_REPLY:
      return {
        ...state,
        inviteReplying: true,
      };
    case types.INVITE_REPLY_SUCCESS:
      return {
        ...state,
        inviteReplying: false,
        isListeningInvites: true,
        invite: null,
        gameToRedirect: action.payload,
      };
    case types.INVITE_REPLY_FAILURE:
      return {
        ...state,
        isListeningInvites: true,
        invite: null,
        gameToRedirect: null,
      };
    case types.CLEAR_GAME_REDIRECTION:
      return {
        ...state,
        gameToRedirect: null,
      };
    default:
      return state;
  }
}

export default inviteReducer;
