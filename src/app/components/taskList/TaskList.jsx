import PropTypes from 'prop-types';

import Task from '../task/Task';
// import './TaskList.scss';

function TaskList({
  todos,
  onTodoToggle,
  onTodoEditSubmit,
  onTodoDelete,
}) {
  const handleTodoToggle = (itemId) => {
    const toggleTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      return { todos: toggled };
    };
    onTodoToggle(toggleTodo);
  };

  const handleTodoEditSubmit = ({ newTodo }) => {
    const editTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              value: newTodo.value,
              timer: newTodo.timer,
            }
          : todo
      );

      return { todos: edited };
    };
    onTodoEditSubmit(editTodo);
  };

  const handleTodoDelete = (itemId) => {
    const filterTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);

      return { todos: filtered };
    };
    onTodoDelete(filterTodos);
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          id={todo.id}
          key={todo.id}
          value={todo.value}
          timer={todo.timer}
          created={todo.created}
          isCompleted={todo.completed}
          onTodoToggle={handleTodoToggle}
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
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default TaskList;
