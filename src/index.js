import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { PROJECT_THEME } from "config";
// import { AUTH_HOST, PROJECT_NAME, CLIENT_HOST } from 'config'

import get from "lodash.get";

import { Provider } from "react-redux";
import store from "store";
import {
  Themes,
  ThemeContext,
  // addComponents,
  // addWrappers
} from "@availabs/avl-components";

import reportWebVitals from "./reportWebVitals";

// import DmsComponents from "components/dms"
// import DmsWrappers from "components/dms/wrappers"

// import {
//   Components as AmsComponents,
//   Wrappers as AmsWrappers,
//   enableAuth
// } from "@availabs/ams"

import "styles/tailwind.css";

// addComponents(DmsComponents);
// addWrappers(DmsWrappers);
//
// addComponents(AmsComponents);
// addWrappers(AmsWrappers);

// const AuthEnabledApp = enableAuth(App, { AUTH_HOST, PROJECT_NAME, CLIENT_HOST });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContext.Provider
        value={get(Themes, PROJECT_THEME, Themes["light"])}
      >
        <App />
        {/*<AuthEnabledApp />*/}
      </ThemeContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
