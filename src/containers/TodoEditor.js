import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { displayToast } from "../helpers/displayToast";
import axios from "axios";

class TodoEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dateUntil: "",
      isImportant: false
    };
  }

  componentDidMount() {
    const { title, dateUntil, isImportant } = this.props;
    if (dateUntil) {
      this.setState({
        title,
        dateUntil,
        isImportant
      });
    } else {
      this.setState({
        title,
        dateUntil: "",
        isImportant
      });
    }
  }

  getMinDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    let dateArray = localISOTime.slice(0, 16);
    return dateArray;
  };

  getMaxDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 366 - tzoffset
    )
      .toISOString()
      .slice(0, -1);
    let dateArray = localISOTime.slice(0, 16);
    return dateArray;
  };

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleDateUntilChange = e => {
    this.setState({ dateUntil: e.target.value });
  };

  handleIsImportant = e => {
    this.setState({ isImportant: e.target.checked });
  };

  handleSumbitEdit = e => {
    const { title, dateUntil, isImportant } = this.state;
    const { todoId, toastManager } = this.props;

    e.preventDefault();
    if (title.length >= 2) {
      axios
        .put(`http://localhost:5000/api/todo/edit/${todoId}`, {
          title,
          dateUntil,
          isImportant
        })
        .then(response => {
          this.props.handleClose();
          this.props.onGetTodos();
          displayToast(toastManager, "Succesfully edited the task.", "success");
        })
        .catch(err => {
          displayToast(toastManager, "Could not edit the task.", "error");
        });
    } else {
      displayToast(
        toastManager,
        "Title has to be at least two characters long.",
        "error"
      );
    }
  };

  render() {
    const { title, dateUntil, isImportant } = this.state;
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make changes to the task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmitTodo}>
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
                value={title}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>To finish by...</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                onChange={this.handleDateUntilChange}
                value={dateUntil ? dateUntil.slice(0, 16) : dateUntil}
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
                checked={isImportant}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSumbitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default TodoEditor;
