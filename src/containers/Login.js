import React, { Component } from "react";
import "../styles/RegLog.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { displayToast } from "../helpers/displayToast";
import { setCurrentUser } from "../store/actions/setCurrentUser";
import setAuthorizationToken from "../helpers/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestLogin: () =>
      dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))))
  };
};
class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleUpdateInputs = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginRequest = e => {
    const { toastManager } = this.props;
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => response.data)
      .then(data => {
        if (data) {
          window.localStorage.setItem("token", data);
          setAuthorizationToken(data);
          this.props.onRequestLogin();
          displayToast(toastManager, "Logged in.", "success");
        }
      })
      .catch(err =>
        displayToast(toastManager, err.response.data.message, "error")
      );
  };

  render() {
    return (
      <div className="regLog">
        <h1>Login</h1>
        <Form onSubmit={this.handleLoginRequest}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={this.handleUpdateInputs}
              value={this.state.email}
            />
            <Form.Text className="text-muted" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleUpdateInputs}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
