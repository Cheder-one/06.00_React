import { Component } from 'react';
import PropTypes from 'prop-types';

import { generateId } from '../../utils';
import './taskInput.scss';

class TaskInput extends Component {
  handleInputChange = ({ target }) => {
    const { onInputChange, name } = this.props;
    onInputChange({ name, value: target.value });
  };

  handleSubmit = ({ key }) => {
    const { name, value, ...props } = this.props;

    if (!value) return;

    if (key === 'Enter') {
      const newTodo = {
        id: generateId(),
        value: value.trim(),
        completed: false,
        created: new Date().toISOString(),
      };

      props.onInputChange({ name, value: '' });
      props.onTodoSubmit({ newTodo });
    }
  };

  render() {
    const { props } = this;

    return (
      <input
        name={props.name}
        value={props.value}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={props.autoFocus}
        className={props.className || 'new-todo'}
        placeholder={props.placeholder}
        onChange={this.handleInputChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

TaskInput.defaultProps = {
  placeholder: 'What needs to be done?',
  className: '',
  autoFocus: false,
  title: '',
};

TaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default TaskInput;
