import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import Register from "./Register";
import Login from "./Login";

import "../styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
