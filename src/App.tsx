import React from "react";
import { App, View } from "framework7-react";

import { checkAuthRoutes } from "./routes";

function MainApp() {
  const [user, setUser] = React.useState(true);
  const params = checkAuthRoutes(user);

  return (
    <App {...params}>
      <View browserHistory main url="/" />
    </App>
  );
}

export default MainApp;
