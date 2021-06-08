import React from "react";
import { f7 } from "framework7-react";
import { useTypedSelector } from "./redux/hooks/use-typed-selector.hooks";
import { useActions } from "./redux/hooks/use-action.hooks";
import { userListening } from "./redux/action-creators/user.action-creators";
import { checkAuth } from "./firebase/api/user.api";

import { App, View, Preloader } from "framework7-react";
import { params } from "./routes";

function MainApp() {
  const dispatch = useActions();
  const { loading, user } = useTypedSelector((state) => state.user);

  React.useEffect(() => {
    return checkAuth((user) => {
      dispatch(userListening(user));
    });
  }, []);

  React.useEffect(() => {
    if (!user) {
      f7.views.main.router.navigate("/login");
    }
  }, [user]);

  if (loading) {
    return (
      <Preloader size={70} color="blue" style={{ margin: "50vh, auto" }} />
    );
  }

  return (
    <App {...params}>
      <View browserHistorySeparator="" browserHistory main url="/login" />
    </App>
  );
}

export default MainApp;
