import { Component } from 'react';
import PropTypes from 'prop-types';

import TaskInput from '../../task-input/taskInput';

class Header extends Component {
  handleInputChange = ({ name, value }) => {
    const { onInputChange } = this.props;

    const inputValue = (prev) => ({ ...prev, [name]: value });
    onInputChange(inputValue);
  };

  render() {
    const { props } = this;

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

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default Header;
