import { InviteActionTypes as types } from "../action-types/invite.action-types";
import { InviteActions } from "../actions/invite.actions";
import { Invite } from "../../types/invite.types";

interface InviteState {
  isSendingInvite: boolean;
  inviteFetchingPopup: boolean;
  isListeningInvites: boolean;
  inviteReplying: boolean;
  invite: Invite | null;
  gameToRedirect: string | null;
}

const initialState: InviteState = {
  isSendingInvite: false,
  inviteFetchingPopup: false,
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
      };
    case types.INVITE_SEND_SUCCESS:
      return {
        ...state,
        isSendingInvite: false,
      };
    case types.INVITE_SEND_FAILURE:
      return {
        ...state,
        isSendingInvite: false,
      };
    case types.INVITE_RECIEVE:
      return {
        ...state,
        isListeningInvites: false,
      };
    case types.INVITE_RECIEVE_SUCCESS:
      return {
        ...state,
        invite: action.payload,
        inviteFetchingPopup: true,
      };
    case types.INVITE_RECIEVE_FAILURE:
      return {
        ...state,
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
        inviteFetchingPopup: false,
        isListeningInvites: false,
        invite: null,
        gameToRedirect: action.payload,
      };
    case types.INVITE_REPLY_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default inviteReducer;
