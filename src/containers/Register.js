import React, { Component } from "react";
import "../styles/RegLog.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { displayToast } from "../helpers/displayToast";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleUpdateInputs = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegisterRequest = e => {
    const { toastManager } = this.props;
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      })
      .then(response => {
        if (response.status === 200) {
          displayToast(toastManager, response.data.message, "success");
        } else {
          displayToast(toastManager, response.data.message, "error");
        }
      })
      .catch(err => {
        displayToast(toastManager, err.response.data.message, "error");
      });
  };

  render() {
    return (
      <div className="regLog">
        <h1>Register</h1>
        <Form onSubmit={this.handleRegisterRequest}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              value={this.state.name}
              onChange={this.handleUpdateInputs}
              placeholder="Enter your first name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleUpdateInputs}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleUpdateInputs}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={this.handleUpdateInputs}
              placeholder="Confirm password"
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

export default connect(mapStateToProps)(Register);
