import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="homeLink">
          <NavLink to="/">Home </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
