/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';

import { generateId } from '../../utils';
import './TaskInput.scss';

function TaskInput({
  name,
  value,
  placeholder,
  className,
  autoFocus,
  onInputChange,
  onTodoSubmit,
}) {
  const handleInputChange = ({ target }) => {
    onInputChange({ name, value: target.value });
  };

  const handleSubmit = ({ key }) => {
    const inputValue = value.trim();
    if (!inputValue) return;

    if (key === 'Enter') {
      const newTodo = {
        id: generateId(),
        value: inputValue,
        completed: false,
        created: new Date().toISOString(),
      };

      onInputChange({ name, value: '' });
      onTodoSubmit({ newTodo });
    }
  };

  return (
    <input
      name={name}
      value={value}
      autoFocus={autoFocus}
      className={className || 'new-todo'}
      placeholder={placeholder}
      onChange={handleInputChange}
      onKeyDown={handleSubmit}
    />
  );
}

TaskInput.defaultProps = {
  placeholder: 'What needs to be done?',
  className: '',
  autoFocus: false,
};

TaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default TaskInput;
