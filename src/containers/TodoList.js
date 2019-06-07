import React, { Component } from "react";
import Todo from "../containers/Todo";
import TodoCreator from "../containers/TodoCreator";
import TodoSort from "../containers/TodoSort";
import { Container, Row, Col } from "react-bootstrap";
import { displayToast } from "../helpers/displayToast";
import axios from "axios";

import "../styles/TodoList.css";

class TodoList extends Component {
  state = {
    todos: [],
    sortBy: 1,
    hideCompleted: false
  };

  componentDidMount() {
    this.handleGetTodos();
  }

  handleChangeSort = e => {
    this.setState({
      sortBy: e.target.value
    });
  };

  handleChangeHideCompleted = e => {
    this.setState({
      hideCompleted: e.target.checked
    });
  };

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

  sortedTodos = () => {
    switch (this.state.sortBy) {
      case "1":
        return this.state.todos.sort(function(a, b) {
          return new Date(b.dateadded) - new Date(a.dateadded);
        });
      case "2":
        return this.state.todos.sort(function(a, b) {
          return new Date(a.dateadded) - new Date(b.dateadded);
        });
      case "3":
        return this.state.todos.sort(function(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      case "4":
        return this.state.todos.sort(function(a, b) {
          if (b.title.toLowerCase() < a.title.toLowerCase()) {
            return -1;
          }
          if (b.title.toLowerCase() > a.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      default:
        return this.state.todos;
    }
  };

  getTodoList = (todos = this.sortedTodos()) => {
    return todos.map(todo => (
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
  };

  render() {
    let todolist;
    if (this.state.hideCompleted) {
      todolist = this.getTodoList(
        this.sortedTodos().filter(todo => {
          return !todo.iscompleted;
        })
      );
    } else {
      todolist = this.getTodoList();
    }

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
            {this.state.todos.length > 0 ? (
              <TodoSort
                hideCompleted={this.state.hideCompleted}
                onChangeHideCompleted={this.handleChangeHideCompleted}
                sortBy={this.state.sortBy}
                onChangeSort={this.handleChangeSort}
              />
            ) : null}

            {todolist}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
