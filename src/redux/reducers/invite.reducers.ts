import { InviteActionTypes as types } from "../action-types/invite.action-types";
import { InviteActions } from "../actions/invite.actions";
import { Invite } from "../../types/invite.types";

interface InviteState {
  isFetchingInvite: boolean;
  invite: Invite | null;
}

const initialState: InviteState = {
  isFetchingInvite: false,
  invite: null,
};

function inviteReducer(
  state: InviteState = initialState,
  action: InviteActions
) {
  switch (action.type) {
    case types.INVITE_SEND:
      return {
        ...state,
        isFetchingInvite: true,
      };
    case types.INVITE_SEND_SUCCESS:
      return {
        ...state,
        isFetchingInvite: false,
      };
    case types.INVITE_SEND_FAILURE:
      return {
        ...state,
        isFetchingInvite: false,
      };
    case types.INVITE_RECIEVE:
      return {
        ...state,
        isFetchingInvite: true,
      };
    case types.INVITE_RECIEVE_SUCCESS:
      return {
        ...state,
        invite: action.payload,
        isFetchingInvite: false,
      };
    case types.INVITE_RECIEVE_FAILURE:
      return {
        ...state,
        isFetchingInvite: false,
      };
    case types.INVITE_REPLY:
      return {
        ...state,
        isFetchingInvite: true,
      };
    case types.INVITE_REPLY_SUCCESS:
      return {
        ...state,
        isFetchingInvite: false,
      };
    case types.INVITE_REPLY_FAILURE:
      return {
        ...state,
        isFetchingInvite: false,
      };
    default:
      return state;
  }
}

export default inviteReducer;
