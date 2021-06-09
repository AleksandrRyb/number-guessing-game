import { useDispatch } from "react-redux";
import { Actions } from "../redux/actions/user.actions";

export function useActions() {
  const dispatch = useDispatch();
  return (actions: Actions) => dispatch(actions);
}
