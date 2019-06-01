import React, { Component } from "react";
import Todo from "../containers/Todo";
import TodoCreator from "../containers/TodoCreator";
import { Container, Row, Col } from "react-bootstrap";

import "../styles/TodoList.css";

class TodoList extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row>
          <Col lg={4}>
            <TodoCreator />
          </Col>
          <Col className="todoList">
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
            <Todo />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
