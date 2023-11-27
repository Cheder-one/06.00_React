import { Component } from "react";
import PropTypes from "prop-types";

import TaskInput from "../task-input/taskInput";

class Task extends Component {
  state = {
    isEdit: false
  };

  handleClick = (e) => {
    const { checkIsClassExist } = Utils;

    if (checkIsClassExist(e, "icon-edit")) {
      this.toggleTodoEdit(e);
    }
    if (checkIsClassExist(e, "icon-destroy")) {
      // this.props.onTaskDel(e);
    } else {
      this.handleCheckboxClick(e);
    }
  };

  handleCheckboxClick = ({ target, currentTarget }) => {
    const id = currentTarget.id;
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

  handleInputChange = (obj) => {
    const props = this.props;
    props.onInputChange(obj);
  };

  handleTodoChange = (params) => {
    console.log(params);
    const props = this.props;
    props.onInputChange(params);
  };

  toggleTodoEdit = ({ target, currentTarget }) => {
    this.setState((prev) => ({
      isEdit: !prev.isEdit
    }));
  };

  render() {
    const props = this.props;
    const { isEdit } = this.state;

    return (
      <li
        id={props.id}
        className={isEdit ? "editing" : ""}
        onClick={this.handleClick}
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
            name="todoInputEdit"
            value={props.valueEdit}
            className="edit"
            placeholder=""
            onInputChange={this.handleInputChange}
            onTodoSubmit={this.handleTodoChange}
          />
        )}
      </li>
    );
  }
}

class Utils extends Task {
  static checkIsClassExist(event, className) {
    return event.target.classList.contains(className);
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueEdit: PropTypes.string,
  created: PropTypes.number.isRequired,
  isEdit: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired
};

export default Task;
