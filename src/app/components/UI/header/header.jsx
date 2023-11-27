import { Component } from "react";
import PropTypes from "prop-types";

import TaskInput from "../../task-input/taskInput";

class Header extends Component {
  render() {
    const props = this.props;

    return (
      <header className="header">
        {props.title && <h1>{props.title}</h1>}

        <TaskInput
          name="todoInput"
          value={props.inputValue}
          autoFocus
          onInputChange={props.onInputChange}
          onTodoSubmit={props.onTodoSubmit}
        />
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired
};

export default Header;
