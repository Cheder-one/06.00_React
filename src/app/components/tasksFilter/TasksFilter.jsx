import PropTypes from 'prop-types';

import './TasksFilter.scss';

function TasksFilter({ todoFilter, onFilterChange }) {
  const handleFilterChange = (event) => {
    const { dataset } = event.target;

    if (dataset.todoFilter) {
      onFilterChange(dataset.todoFilter);
    }
  };

  const handlePressFilterChange = (event) => {
    if (event.key === 'Enter') {
      handleFilterChange(event);
    }
  };

  const calcClassName = (className) => {
    return className === todoFilter
      ? `${className} selected`
      : `${className}`;
  };

  const filters = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };

  return (
    <ul className="filters">
      {Object.keys(filters).map((filter) => (
        <li key={filter}>
          <button
            type="button"
            data-todo-filter={filter}
            className={calcClassName(filter)}
            onClick={handleFilterChange}
            onKeyDown={handlePressFilterChange}
          >
            {filters[filter]}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.propTypes = {
  todoFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
