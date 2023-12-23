import PropTypes from 'prop-types';

import Task from '../task/Task';
// import './TaskList.scss';

// TASK Запоминать время таймера в момент Unmount
// TASK Записывать таймстамп в момент Unmount
// TASK При Mount восстанавливаем сессию времени таймера
// TASK Date.now() - таймстамп
// TASK Восстановленный таймер - timestampDiff

function TaskList({
  todos,
  onTodoToggle,
  onTimerToggle,
  onTodoEditSubmit,
  onTodoDelete,
}) {
  console.table(todos);

  const handleTodoToggle = (itemId) => {
    const toggledTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return { todos: toggled };
    };
    onTodoToggle(toggledTodo);
  };

  const handleTodoEditSubmit = ({ newTodo }) => {
    const editedTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              value: newTodo.value,
              timerValue: newTodo.timerValue,
            }
          : todo
      );

      return { todos: edited };
    };
    onTodoEditSubmit(editedTodo);
  };

  const handleTodoDelete = (itemId) => {
    const filteredTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);

      return { todos: filtered };
    };
    onTodoDelete(filteredTodos);
  };

  const toggleTodoTimer = (itemId, fieldName, status) => {
    const toggledTimer = (prev) => {
      const toggled = prev.todos.map((todo) =>
        // prettier-ignore
        todo.id === itemId
          ? { ...todo, [fieldName]: status }
          : todo
      );

      return { todos: toggled };
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
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default TaskList;
