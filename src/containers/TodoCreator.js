import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import "../styles/TodoCreator.css";

class TodoCreator extends Component {
  state = {
    todo: {
      title: "",
      description: "",
      date: "",
      important: false
    }
  };

  getMinDate = () => {
    const currentDate = new Date().toISOString();
    let dateArray = [...currentDate];
    dateArray = dateArray.splice(0, 16);
    return dateArray.join("");
  };

  getMaxDate = () => {
    let currentDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 366
    ).toISOString();
    let dateArray = [...currentDate];
    dateArray = dateArray.splice(0, 16);
    return dateArray.join("");
  };

  handleTitleInput = e => {
    const todo = { ...this.state.todo };
    todo.title = e.target.value;
    this.setState({ todo });
  };

  handleDescriptionInput = e => {
    const todo = { ...this.state.todo };
    todo.description = e.target.value;
    this.setState({ todo });
  };

  handleDateChange = e => {
    const todo = { ...this.state.todo };
    todo.date = e.target.value;
    this.setState({ todo });
  };

  handleImportant = e => {
    const todo = { ...this.state.todo };
    todo.important = e.target.checked;
    this.setState({ todo });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleLoginRequest}>
          <Form.Group controlId="formBasicEmail">
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
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              name="description"
              onChange={this.handleDescriptionInput}
              value={this.state.todo.description}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>To finish by...</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              onChange={this.handleDateChange}
              value={this.state.todo.date}
              min={this.getMinDate()}
              max={this.getMaxDate()}
            />
          </Form.Group>
          <Form.Group controlId="formIsImportant">
            <Form.Check
              type="checkbox"
              label={`Mark as important`}
              name="important"
              onChange={this.handleImportant}
              checked={this.state.todo.important}
            />
          </Form.Group>

          <Button type="submit">Add Todo</Button>
        </Form>
      </div>
    );
  }
}

export default TodoCreator;
