import { Component } from "react";
import PropTypes from "prop-types";

import TaskInput from "../task-input/taskInput";

class Task extends Component {
  state = {
    isEdit: false,
    editableTodoId: "",
    newTodoValue: ""
  };

  handleTodoClick = (e) => {
    const { hasClassInTarget } = Utils;
    const isEdit = hasClassInTarget(e, "icon-edit");
    const isDelete = hasClassInTarget(e, "icon-destroy");
    const editableTodoId = e.currentTarget.id;

    if (isEdit) {
      this.toggleTodoEdit(e);
      this.setState((prev) => ({ ...prev, editableTodoId }));
    } else if (isDelete) {
      this.handleTodoDelete(e);
    } else {
      this.handleCheckboxClick(e);
    }
  };

  handleCheckboxClick = ({ target, currentTarget }) => {
    const id = currentTarget.id;

    this.props.onTodoToggle(id);
    Utils.markTodo(target, id);
  };

  toggleTodoEdit = () => {
    this.setState((prev) => ({
      ...prev,
      isEdit: !prev.isEdit
    }));
  };

  handleTodoEdit = ({ name, value }) => {
    this.setState((prev) => ({ ...prev, [name]: value }));
  };

  handleTodoSubmit = () => {
    const { editableTodoId, newTodoValue } = this.state;
    this.props.onTodoEditSubmit({
      newTodo: {
        id: editableTodoId,
        value: newTodoValue
      }
    });
    this.toggleTodoEdit();
  };

  handleTodoDelete = ({ currentTarget }) => {
    this.props.onTodoDelete(currentTarget.id);
  };

  render() {
    const props = this.props;
    const { isEdit, newTodoValue } = this.state;

    return (
      <li
        id={props.id}
        className={isEdit ? "editing" : ""}
        onClick={this.handleTodoClick}
      >
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{props.value}</span>
            <span className="created">{props.created}</span>
          </label>
          <button className="icon icon-edit" />
          <button className="icon icon-destroy" />
        </div>
        {isEdit && (
          <TaskInput
            name="newTodoValue"
            value={newTodoValue}
            autoFocus
            className="edit"
            placeholder=""
            onInputChange={this.handleTodoEdit}
            onTodoSubmit={this.handleTodoSubmit}
          />
        )}
      </li>
    );
  }
}

class Utils extends Task {
  static hasClassInTarget(event, className) {
    return event.target.classList.contains(className);
  }

  static markTodo = (target, id) => {
    const li = document.getElementById(id);

    switch (target.className) {
      case "toggle":
        li.classList.toggle("completed");
        break;
      case "description":
        const checkbox = li.querySelector(".toggle");
        checkbox.click();
    }
  };
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueEdit: PropTypes.string,
  created: PropTypes.number.isRequired,
  isEdit: PropTypes.bool
};

export default Task;
