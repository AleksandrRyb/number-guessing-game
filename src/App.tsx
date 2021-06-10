/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { f7 } from "framework7-react";
import { useTypedSelector } from "./hooks/use-typed-selector.hooks";
import { useActions } from "./hooks/use-action.hooks";
import { userListening } from "./redux/action-creators/user.action-creators";
import { checkAuth } from "./firebase/api/user.api";

import { App, View } from "framework7-react";
import { params } from "./routes";

function MainApp() {
  const dispatch = useActions();
  const { isFetchingUser, user, isListening } = useTypedSelector(
    (state) => state.user
  );

  // React.useEffect(() => {
  //   if (!user && !isFetchingUser) {
  //     console.log(user, isFetchingUser);
  //     f7.views.main.router.navigate("/login");
  //   }
  // }, [user, isFetchingUser]);

  React.useEffect(() => {
    return checkAuth((user) => {
      if (isListening && user) {
        dispatch(userListening(user));
      }
    });
  }, [isListening]);

  return (
    <App {...params}>
      <View browserHistorySeparator="" browserHistory main url="/" />
    </App>
  );
}

export default MainApp;
