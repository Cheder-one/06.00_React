import PropTypes from 'prop-types';

import TaskInput from '../../taskInput/TaskInput';

function Header({ title, inputValue, onInputChange, onTodoSubmit }) {
  const handleInputChange = (data) => {
    onInputChange((prev) => ({
      ...prev,
      [data.name]: data.value,
    }));
  };

  return (
    <header className="header">
      {title && <h1>{title}</h1>}

      <TaskInput
        name="todoInput"
        value={inputValue}
        autoFocus
        onInputChange={handleInputChange}
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
  onInputChange: PropTypes.func.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
};

export default Header;
