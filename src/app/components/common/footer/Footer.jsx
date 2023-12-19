import PropTypes from 'prop-types';

import TasksFilter from '../../tasksFilter/TasksFilter';
// import './Footer.scss';

function Footer({
  todos,
  todoCount,
  todoFilter,
  onFilterItems,
  onClearComplete,
}) {
  const handleFilterChange = (selectedFilter) => {
    onFilterItems(selectedFilter);
  };

  const handleClearCompletedClick = () => {
    const filterCompleted = (prev) => {
      const filtered = prev.todos.filter(
        (todo) => todo.completed === false
      );

      return { ...prev, todos: filtered };
    };
    onClearComplete(filterCompleted);
  };

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter
        todoFilter={todoFilter}
        todos={todos}
        onFilterChange={handleFilterChange}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompletedClick}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  todoFilter: PropTypes.string.isRequired,
  todoCount: PropTypes.number.isRequired,
  onFilterItems: PropTypes.func.isRequired,
  onClearComplete: PropTypes.func.isRequired,
};

export default Footer;
