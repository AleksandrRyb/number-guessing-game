import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Framework7 from "framework7/lite-bundle";
import Framework7React from "framework7-react";
import "framework7/framework7-bundle.css";

import App from "./App";
import { store } from "./redux/store";

Framework7.use(Framework7React);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
