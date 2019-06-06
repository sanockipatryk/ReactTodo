import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import TodoList from "../containers/TodoList";
import { connect } from "react-redux";

import "../styles/Home.css";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};

class Home extends Component {
  render() {
    return (
      <div className="home">
        {this.props.isAuthenticated ? (
          <TodoList toastManager={this.props.toastManager} />
        ) : (
          <Jumbotron className="welcomeBox">
            <h1>Welcome to your personal list of things to do!</h1>
            <p>To access your list, please log in, or register your account.</p>
          </Jumbotron>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
