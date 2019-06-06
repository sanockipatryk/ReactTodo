import React, { Component } from "react";
import { ButtonGroup, ButtonToolbar, Button, Jumbotron } from "react-bootstrap";
import TodoEditor from "./TodoEditor";
import Countdown from "react-countdown-now";
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
        <ButtonToolbar className="todoToolbar">
          <Jumbotron
            className={
              isImportant
                ? isCompleted
                  ? "todoTitleJumbotron important completed"
                  : "todoTitleJumbotron important"
                : isCompleted
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
          <ButtonGroup className="todoBtnGroup">
            {isCompleted ? null : (
              <>
                {dateUntil ? (
                  <Button variant="warning">
                    <i className="far fa-clock" />{" "}
                    <Countdown date={Date.parse(dateUntil)} intervalDelay={0} />
                  </Button>
                ) : null}
                <Button
                  variant="success"
                  title="Complete"
                  onClick={() => onComplete(todoId)}
                >
                  <i className="far fa-check-square" />
                </Button>
                <Button
                  variant="primary"
                  title="Edit"
                  onClick={this.handleShow}
                >
                  <i className="far fa-edit" />
                </Button>
              </>
            )}
            <Button
              variant="danger"
              title="Remove"
              onClick={() => onDelete(todoId)}
            >
              <i className="far fa-trash-alt" />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <TodoEditor
          title={title}
          dateUntil={dateUntil}
          isImportant={isImportant}
          todoId={todoId}
          show={this.state.showModalEdit}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
          onGetTodos={this.props.onGetTodos}
          toastManager={this.props.toastManager}
        />
      </div>
    );
  }
}

export default Todo;
