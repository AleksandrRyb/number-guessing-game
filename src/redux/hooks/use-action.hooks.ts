import { useDispatch } from "react-redux";
import { Actions } from "../actions/user.actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return (actions: Actions) => dispatch(actions);
};
