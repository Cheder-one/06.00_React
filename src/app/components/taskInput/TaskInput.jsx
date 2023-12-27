/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';

import { formatTimer, generateId } from '../../utils';

function TaskInput({
  id,
  name,
  value,
  initValue,
  timerValue,
  placeholder,
  className,
  autoFocus,
  onInputChange,
  onTodoEditToggle,
  onTimerChange,
  onTimerToggle,
  onTodoSubmit,
}) {
  const handleInputChange = ({ target }) => {
    onInputChange(target.value);
  };

  const handleTimerChange = ({ target }) => {
    if (isNaN(target.value)) return;

    onTimerChange((prev) => ({
      ...prev,
      [target.name]: target.value,
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
    e.preventDefault();
    const input = value.trim();

    if (!input) return;
    const newTodo = createNewTodo(input, timerValue);

    onInputChange('');
    onTodoSubmit(newTodo);
  };

  const handleCancelEdit = ({ key }) => {
    if (!initValue) return;
    const { todo, timer } = initValue;

    if (key === 'Escape') {
      onTodoEditToggle();
      onInputChange(todo);
      onTimerChange(timer);
      onTimerToggle(id, 'isRunning', true);
    }
  };

  return (
    // eslint-disable-next-line
    <form
      className="new-todo-form"
      onSubmit={handleInputSubmit}
      onKeyDown={handleCancelEdit}
    >
      <input
        name={name}
        value={value}
        autoFocus={autoFocus}
        className={className || 'new-todo'}
        placeholder={placeholder}
        onChange={handleInputChange}
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
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  initValue: PropTypes.shape({
    todo: PropTypes.string.isRequired,
    timer: PropTypes.shape({
      min: PropTypes.string.isRequired,
      sec: PropTypes.string.isRequired,
    }).isRequired,
  }),
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  onTodoEditToggle: PropTypes.func,
  onTimerChange: PropTypes.func.isRequired,
  onTimerToggle: PropTypes.func,
  onTodoSubmit: PropTypes.func.isRequired,
};

TaskInput.defaultProps = {
  id: null,
  initValue: null,
  onTimerToggle: null,
  onTodoEditToggle: null,
};

export default TaskInput;
