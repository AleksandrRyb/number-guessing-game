/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useTypedSelector } from "./hooks/use-typed-selector.hooks";
import { useActions } from "./hooks/use-action.hooks";
import { userListening } from "./redux/action-creators/user.action-creators";
import { checkAuth } from "./firebase/api/user.api";

import { App, View, Preloader } from "framework7-react";
import { params } from "./routes";

function MainApp() {
  const dispatch = useActions();
  const { isFetching, user, userLoginRequest } = useTypedSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    return checkAuth((user) => {
      if (!userLoginRequest) {
        dispatch(userListening(user));
      }
    });
  }, []);

  if (isFetching) {
    return (
      <Preloader size={70} color="blue" style={{ margin: "50vh, auto" }} />
    );
  }

  return (
    <App {...params}>
      <View browserHistorySeparator="" browserHistory main url="/" />
    </App>
  );
}

export default MainApp;
