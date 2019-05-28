import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { requestLogout } from "../store/actions/requestLogout";
import setAuthorizationToken from "../helpers/setAuthorizationToken";

import "../styles/Header.css";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestLogout: () => dispatch(requestLogout())
  };
};

class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    setAuthorizationToken();
    this.props.onRequestLogout();
  };
  render() {
    return (
      <header>
        <ul>
          {!this.props.isAuthenticated ? (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          ) : null}
          <li>
            {this.props.isAuthenticated ? (
              <p className="logoutClick" onClick={this.handleLogout}>
                Logout
              </p>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
          <li className="homeLink">
            <NavLink to="/">Home </NavLink>
          </li>
        </ul>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
