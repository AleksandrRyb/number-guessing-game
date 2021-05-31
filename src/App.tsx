import React from "react";
import { App, View } from "framework7-react";

import { f7params } from "./routes";

function MainApp() {
  return <UnauthApp />;
}

function UnauthApp() {
  return (
    <App {...f7params}>
      <View main url="/" />;
    </App>
  );
}

// function AuthApp() {
//   return "Auth Pages";
// }

export default MainApp;
