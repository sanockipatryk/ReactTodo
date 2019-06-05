import React, { Component } from "react";
import { ButtonGroup, Button, Jumbotron } from "react-bootstrap";
import TodoEditor from "./TodoEditor";
import "../styles/Todo.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalEdit: false
    };
  }

  handleClose = () => {
    this.setState({ showModalEdit: false });
  };

  handleShow = () => {
    this.setState({ showModalEdit: true });
  };

  render() {
    const {
      title,
      dateAdded,
      dateUntil,
      dateFinished,
      isCompleted,
      isImportant,
      todoId,
      onDelete,
      onComplete
    } = this.props;
    return (
      <div className="todo">
        <ButtonGroup className="todoBtnGroup">
          <Jumbotron
            className={
              isCompleted
                ? "todoTitleJumbotron completed"
                : "todoTitleJumbotron"
            }
            title={
              isCompleted
                ? `Finished ${new Date(dateFinished).toLocaleString()}`
                : `Added ${new Date(dateAdded).toLocaleString()}`
            }
            fluid
          >
            <p>{title}</p>
          </Jumbotron>
          {isCompleted ? null : (
            <>
              <Button variant="success" onClick={() => onComplete(todoId)}>
                <i className="far fa-check-square" />
              </Button>
              <Button variant="primary" onClick={this.handleShow}>
                <i className="far fa-edit" />
              </Button>
            </>
          )}
          <Button variant="danger" onClick={() => onDelete(todoId)}>
            <i className="far fa-trash-alt" />
          </Button>
        </ButtonGroup>

        <TodoEditor
          title={title}
          dateUntil={dateUntil}
          isImportant={isImportant}
          todoId={todoId}
          show={this.state.showModalEdit}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          onGetTodos={this.props.onGetTodos}
        />
      </div>
    );
  }
}

export default Todo;
