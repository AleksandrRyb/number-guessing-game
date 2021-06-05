//@ts-nocheck
import React from "react";
import { checkAuth } from "./firebase/api/user.api";
import { checkAuthRoutes } from "./routes";

import { App, View, Preloader } from "framework7-react";

function MainApp() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const params = checkAuthRoutes(user);

  React.useEffect(() => {
    return checkAuth((user) => {
      setUser(user);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, []);

  if (loading) {
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
