import { Component } from "react";
import PropTypes from "prop-types";

import TaskInput from "../../task-input/taskInput";

class Header extends Component {
  handleInputChange = ({ name, value }) => {
    const inputValue = (prev) => ({ ...prev, [name]: value });
    this.props.onInputChange(inputValue);
  };

  render() {
    const props = this.props;

    return (
      <header className="header">
        {props.title && <h1>{props.title}</h1>}

        <TaskInput
          name="todoInput"
          value={props.inputValue}
          autoFocus
          onInputChange={this.handleInputChange}
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
