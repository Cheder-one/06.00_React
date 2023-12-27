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
  onToggleTodoEdit,
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
      onToggleTodoEdit();
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
