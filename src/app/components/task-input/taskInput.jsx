import { Component } from "react";
import PropTypes from "prop-types";

import "./taskInput.scss";
import { generateId } from "../../utils";

class TaskInput extends Component {
  handleInputChange = ({ target }) => {
    const { onInputChange, name } = this.props;
    onInputChange({ name, value: target.value });
  };

  handleSubmit = ({ key }) => {
    const { name, value, ...props } = this.props;

    if (!value) return;

    if (key === "Enter") {
      const newTodo = {
        id: generateId(),
        value: value.trim(),
        completed: false
      };

      props.onInputChange({ name, value: "" });
      props.onTodoSubmit({ newTodo });
    }
  };

  render() {
    const props = this.props;

    return (
      <input
        name={props.name}
        value={props.value}
        autoFocus={props.autoFocus}
        className={props.className || "new-todo"}
        placeholder={props.placeholder}
        onChange={this.handleInputChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

TaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired
};

TaskInput.defaultProps = {
  placeholder: "What needs to be done?"
};

export default TaskInput;
