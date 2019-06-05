import React, { Component } from "react";
import Todo from "../containers/Todo";
import TodoCreator from "../containers/TodoCreator";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import "../styles/TodoList.css";

class TodoList extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.handleGetTodos();
  }

  handleGetTodos = () => {
    axios
      .get("http://localhost:5000/api/todo")
      .then(response => response.data)
      .then(data => {
        this.setState({
          todos: data
        });
      });
  };

  handleCompleteTodo = todoId => {
    axios
      .put(`http://localhost:5000/api/todo/complete/${todoId}`)
      .then(resp => resp.data)
      .then(data => {
        if (data) this.handleGetTodos();
      });
  };

  handleDeleteTodo = todoId => {
    axios
      .delete(`http://localhost:5000/api/todo/${todoId}`)
      .then(resp => resp.data)
      .then(data => {
        if (data) this.handleGetTodos();
      });
  };

  render() {
    const todolist = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        todoId={todo.id}
        title={todo.title}
        dateAdded={todo.dateadded}
        dateUntil={todo.dateuntil}
        dateFinished={todo.datefinished}
        isCompleted={todo.iscompleted}
        isImportant={todo.isimportant}
        onDelete={this.handleDeleteTodo}
        onComplete={this.handleCompleteTodo}
        onGetTodos={this.handleGetTodos}
      />
    ));
    return (
      <Container>
        <Row>
          <Col lg={4}>
            <TodoCreator onHandleAddTodo={this.handleGetTodos} />
          </Col>
          <Col className="todoList">{todolist}</Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
