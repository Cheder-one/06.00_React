import PropTypes from 'prop-types';

import Task from '../task/Task';

function TaskList({
  todos,
  onTodoToggle,
  onTimerToggle,
  onTodoEditSubmit,
  onTodoDelete,
}) {
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
          onTodoToggle={onTodoToggle}
          onTimerToggle={onTimerToggle}
          onTodoEditSubmit={onTodoEditSubmit}
          onTodoDelete={onTodoDelete}
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
