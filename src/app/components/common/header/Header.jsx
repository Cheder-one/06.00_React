import PropTypes from 'prop-types';

import TaskInput from '../../taskInput/TaskInput';

function Header({
  title,
  inputValue,
  timerValue,
  onInputChange,
  onTimerChange,
  onTodoSubmit,
}) {
  return (
    <header className="header">
      {title && <h1>{title}</h1>}
      <TaskInput
        name="todoInput"
        value={inputValue}
        timerValue={timerValue}
        autoFocus
        onInputChange={onInputChange}
        onTimerChange={onTimerChange}
        onTodoSubmit={onTodoSubmit}
      />
    </header>
  );
}

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onTimerChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default Header;
