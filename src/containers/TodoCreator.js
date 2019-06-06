import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { displayToast } from "../helpers/displayToast";
import axios from "axios";

import "../styles/TodoCreator.css";

class TodoCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {
        title: "",
        dateUntil: "",
        isImportant: false
      }
    };
  }

  getMinDate = () => {
    const currentDate = new Date().toISOString();
    let dateArray = currentDate.slice(0, 16);
    return dateArray;
  };

  getMaxDate = () => {
    let currentDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 366
    ).toISOString();
    let dateArray = currentDate.slice(0, 16);
    return dateArray;
  };

  handleTitleInput = e => {
    const todo = { ...this.state.todo };
    todo.title = e.target.value;
    this.setState({ todo });
  };

  handleDateUntilChange = e => {
    const todo = { ...this.state.todo };
    todo.dateUntil = e.target.value;
    this.setState({ todo });
  };

  handleIsImportant = e => {
    const todo = { ...this.state.todo };
    todo.isImportant = e.target.checked;
    this.setState({ todo });
  };

  handleSubmitTodo = e => {
    e.preventDefault();
    const todo = { ...this.state.todo };
    const { toastManager } = this.props;
    if (todo.title.length >= 2) {
      axios
        .post("http://localhost:5000/api/todo", {
          title: todo.title,
          dateUntil: todo.dateUntil,
          isImportant: todo.isImportant
        })
        .then(response => {
          this.setState({
            todo: {
              title: "",
              dateUntil: "",
              isImportant: false
            }
          });
          displayToast(
            toastManager,
            "Succesfully created the task.",
            "success"
          );
          this.props.onHandleAddTodo();
        })
        .catch(err =>
          displayToast(toastManager, "Could not create the task.", "error")
        );
    }
  };

  render() {
    return (
      <div>
        <Form className="todoCreator" onSubmit={this.handleSubmitTodo}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              maxLength="250"
              minLength="2"
              required
              onChange={this.handleTitleInput}
              value={this.state.todo.title}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>To finish by...</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              onChange={this.handleDateUntilChange}
              value={this.state.todo.dateUntil}
              min={this.getMinDate()}
              max={this.getMaxDate()}
            />
          </Form.Group>
          <Form.Group controlId="formIsImportant">
            <Form.Check
              type="checkbox"
              label={`Mark as important`}
              name="important"
              onChange={this.handleIsImportant}
              checked={this.state.todo.isImportant}
            />
          </Form.Group>

          <Button type="submit">Add task</Button>
        </Form>
      </div>
    );
  }
}

export default TodoCreator;
