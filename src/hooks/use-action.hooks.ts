import { useDispatch } from "react-redux";
import { UserActions } from "../redux/actions/user.actions";
import { ProfileActions } from "../redux/actions/profile.actions";
import { InviteActions } from "../redux/actions/invite.actions";
import { GameActions } from "../redux/actions/game.actions";

type Actions = UserActions | ProfileActions | InviteActions | GameActions;

export function useActions() {
  const dispatch = useDispatch();
  return (actions: Actions) => dispatch(actions);
}
