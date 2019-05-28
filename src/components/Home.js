import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <TodoList />
        ) : (
          <Jumbotron>
            <h1>Welcome to your personal list of things to do!</h1>
            <p>To access your list, please log in, or register your account.</p>
            <p>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
            </p>
          </Jumbotron>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
