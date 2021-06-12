import { useDispatch } from "react-redux";
import { UserActions } from "../redux/actions/user.actions";
import { ProfileActions } from "../redux/actions/profile.actions";
import { InviteActions } from "../redux/actions/invite.actions";

type Actions = UserActions | ProfileActions | InviteActions;

export function useActions() {
  const dispatch = useDispatch();
  return (actions: Actions) => dispatch(actions);
}
