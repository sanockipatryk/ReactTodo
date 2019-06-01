import React, { Component } from "react";
import { ButtonGroup, Button, Collapse } from "react-bootstrap";
import "../styles/Todo.css";

class Todo extends Component {
  state = {
    open: false,
    todo: {
      title: "make something new for your future",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae nulla nesciunt, maxime iste ducimus accusantium optio nobis neque cumque dolorum excepturi pariatur, odio culpa ipsum voluptatum et obcaecati laboriosam doloribus!",
      dateAdded: new Date(),
      dateUntil: new Date(),
      important: true
    }
  };
  render() {
    const { open, todo } = this.state;
    return (
      <div className="todo">
        <ButtonGroup className="todoBtnGroup" aria-label="Basic example">
          <Button
            variant={open ? "dark" : "outline-dark"}
            onClick={() => this.setState({ open: !open })}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {todo.title}
          </Button>
          <Button variant="success">
            <i className="far fa-check-square" />
          </Button>
          <Button variant="primary">
            <i className="far fa-edit" />
          </Button>
          <Button variant="danger">
            <i className="far fa-trash-alt" />
          </Button>
        </ButtonGroup>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text" className="collapsePanel">
            {todo.description}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Todo;
