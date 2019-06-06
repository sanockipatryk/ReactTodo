import React, { Component } from "react";
import Todo from "../containers/Todo";
import TodoCreator from "../containers/TodoCreator";
import { Container, Row, Col } from "react-bootstrap";
import { displayToast } from "../helpers/displayToast";
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
    const { toastManager } = this.props;
    axios
      .get("http://localhost:5000/api/todo")
      .then(response => response.data)
      .then(data => {
        this.setState({
          todos: data
        });
      })
      .catch(err =>
        displayToast(toastManager, "Could not load tasks.", "error")
      );
  };

  handleCompleteTodo = todoId => {
    const { toastManager } = this.props;
    axios
      .put(`http://localhost:5000/api/todo/complete/${todoId}`)
      .then(resp => resp.data)
      .then(data => {
        if (data) {
          this.handleGetTodos();
        } else {
          displayToast(toastManager, "Could not complete the task.", "error");
        }
      })
      .catch(err =>
        displayToast(toastManager, "Could not complete the task.", "error")
      );
  };

  handleDeleteTodo = todoId => {
    const { toastManager } = this.props;
    axios
      .delete(`http://localhost:5000/api/todo/${todoId}`)
      .then(resp => resp.data)
      .then(data => {
        if (data) {
          this.handleGetTodos();
        } else {
          displayToast(toastManager, "Could not remove the task.", "error");
        }
      })
      .catch(err =>
        displayToast(toastManager, "Could not remove the task.", "error")
      );
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
        isImportant={todo.important}
        onDelete={this.handleDeleteTodo}
        onComplete={this.handleCompleteTodo}
        onGetTodos={this.handleGetTodos}
        toastManager={this.props.toastManager}
      />
    ));
    return (
      <Container>
        <Row>
          <Col lg={12}>
            <TodoCreator
              toastManager={this.props.toastManager}
              onHandleAddTodo={this.handleGetTodos}
            />
          </Col>
          <Col lg={12} className="todoList">
            {todolist}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
