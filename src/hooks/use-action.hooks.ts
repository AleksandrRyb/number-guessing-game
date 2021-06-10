import { useDispatch } from "react-redux";
import { UserActions } from "../redux/actions/user.actions";
import { ProfileActions } from "../redux/actions/profile.actions";

type Actions = UserActions | ProfileActions;

export function useActions() {
  const dispatch = useDispatch();
  return (actions: Actions) => dispatch(actions);
}
