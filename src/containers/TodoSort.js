import React from "react";
import { Form } from "react-bootstrap";
import "../styles/TodoSort.css";

const TodoSort = props => {
  const { hideCompleted, sortBy, onChangeHideCompleted, onChangeSort } = props;
  return (
    <Form id="todoSortForm">
      <Form.Group controlId="formHideCompleted">
        <Form.Check
          type="checkbox"
          label={`Hide completed tasks`}
          name="important"
          checked={hideCompleted}
          onChange={onChangeHideCompleted}
        />
      </Form.Group>
      <Form.Group controlId="formSortBy">
        <Form.Label>Sort...</Form.Label>
        <Form.Control as="select" value={sortBy} onChange={onChangeSort}>
          <option value="1">From newest</option>
          <option value="2">From oldest</option>
          <option value="3">A - Z</option>
          <option value="4">Z - A</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default TodoSort;
