import PropTypes from 'prop-types';

import Task from '../task/Task';

function TaskList({
  todos,
  onTodoToggle,
  onTimerToggle,
  onTodoEditSubmit,
  onTodoDelete,
}) {
  const handleTodoToggle = (itemId) => {
    const toggledTodo = (prevTodos) => {
      const toggled = prevTodos.map((todo) =>
        todo.id === itemId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return toggled;
    };
    onTodoToggle(toggledTodo);
  };

  const handleTodoEditSubmit = (newTodo) => {
    const editedTodo = (prevTodos) => {
      const edited = prevTodos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              value: newTodo.value,
              timerValue: newTodo.timerValue,
            }
          : todo
      );

      return edited;
    };
    onTodoEditSubmit(editedTodo);
  };

  const handleTodoDelete = (itemId) => {
    const filteredTodos = (prevTodos) => {
      const filtered = prevTodos.filter(({ id }) => id !== itemId);

      return filtered;
    };
    onTodoDelete(filteredTodos);
  };

  const toggleTodoTimer = (itemId, fieldName, status) => {
    const toggledTimer = (prevTodos) => {
      const toggled = prevTodos.map((todo) =>
        // prettier-ignore
        todo.id === itemId
          ? { ...todo, [fieldName]: status }
          : todo
      );

      return toggled;
    };
    onTimerToggle(toggledTimer);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          id={todo.id}
          key={todo.id}
          value={todo.value}
          timerValue={todo.timerValue}
          created={todo.created}
          isRunning={todo.isRunning}
          isBlocked={todo.isBlocked}
          isCompleted={todo.isCompleted}
          onTodoToggle={handleTodoToggle}
          onTimerToggle={toggleTodoTimer}
          onTodoEditSubmit={handleTodoEditSubmit}
          onTodoDelete={handleTodoDelete}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      timerValue: PropTypes.shape({
        min: PropTypes.string.isRequired,
        sec: PropTypes.string.isRequired,
      }).isRequired,
      created: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTimerToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default TaskList;
