import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Jumbotron>
        <h1>Welcome to your personal list of things to do!</h1>
        <p>To access your list, please log in, or register your account.</p>
        <p>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home;
