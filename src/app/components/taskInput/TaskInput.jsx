/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-autofocus */
// import './TaskInput.scss';
import PropTypes from 'prop-types';

import { formatTimer, generateId } from '../../utils';

function TaskInput({
  name,
  value,
  timerValue,
  placeholder,
  className,
  autoFocus,
  onInputChange,
  onTimerChange,
  onTodoSubmit,
}) {
  const handleInputChange = ({ target }) => {
    onInputChange({ [name]: target.value });
  };

  const handleTimerChange = ({ target }) => {
    const timer = `${name}Timer`;

    if (isNaN(target.value)) return;

    onTimerChange((prev) => ({
      [timer]: {
        ...prev[timer],
        [target.name]: target.value,
      },
    }));
  };

  const createNewTodo = (input, timer) => {
    return {
      id: generateId(),
      value: input,
      timerValue: formatTimer({ ...timer }),
      isRunning: false,
      isBlocked: false,
      isCompleted: false,
      created: new Date().toISOString(),
    };
  };

  const handleInputSubmit = (e) => {
    const input = value.trim();
    e.preventDefault();

    if (!input) return;

    const newTodo = createNewTodo(input, timerValue);

    onInputChange({ name, value: '' });
    onTodoSubmit({ newTodo });
  };

  return (
    <form className="new-todo-form" onSubmit={handleInputSubmit}>
      <input
        name={name}
        value={value}
        autoFocus={autoFocus}
        className={className || 'new-todo'}
        placeholder={placeholder}
        onChange={handleInputChange}
        // onKeyDown={handleSubmit}
      />
      <input
        name="min"
        value={timerValue.min}
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={handleTimerChange}
      />
      <input
        name="sec"
        value={timerValue.sec}
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={handleTimerChange}
      />
      <button
        className="new-todo-form__submit"
        style={{ display: 'none' }}
        type="submit"
      />
    </form>
  );
}

TaskInput.defaultProps = {
  placeholder: 'Task',
  className: '',
  autoFocus: false,
};

TaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onTimerChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default TaskInput;
