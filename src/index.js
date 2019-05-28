import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import jwtDecode from "jwt-decode";
import auth from "./store/reducers/auth";
import setAuthorizationToken from "./helpers/setAuthorizationToken";
import { setCurrentUser } from "./store/actions/setCurrentUser";

import * as serviceWorker from "./serviceWorker";

const logger = createLogger();
const store = createStore(auth, applyMiddleware(thunk, logger));

if (localStorage.getItem("token")) {
  try {
    const userData = jwtDecode(localStorage.getItem("token"));
    setAuthorizationToken(localStorage.getItem("token"));
    store.dispatch(setCurrentUser(userData));
  } catch (err) {
    localStorage.removeItem("token");
  }
  //   store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
