import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastProvider, withToastManager } from "react-toast-notifications";
import Header from "../components/Header";
import Home from "../components/Home";
import Register from "./Register";
import Login from "./Login";

import "../styles/App.css";

function App() {
  return (
    <Router>
      <ToastProvider>
        <div className="app">
          <Header />
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/register"
            component={withToastManager(Register)}
          />
          <Route exact path="/login" component={withToastManager(Login)} />
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
