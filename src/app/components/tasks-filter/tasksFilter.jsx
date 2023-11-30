/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { Component } from 'react';
import PropTypes from 'prop-types';

import './tasksFilter.scss';

class TasksFilter extends Component {
  handleFilterChange = (event) => {
    const { dataset } = event.target;
    const { onFilterChange } = this.props;

    if (dataset.todoFilter) {
      onFilterChange(dataset.todoFilter);
    }
  };

  handlePressFilterChange = (event) => {
    if (event.key === 'Enter') {
      this.handleFilterChange(event);
    }
  };

  calcClassName = (className) => {
    const { todoFilter } = this.props;

    return className === todoFilter
      ? `${className} selected`
      : `${className}`;
  };

  render() {
    return (
      <ul
        className="filters"
        onClick={this.handleFilterChange}
        onKeyDown={this.handlePressFilterChange}
      >
        <li>
          <button
            type="button"
            data-todo-filter="all"
            className={this.calcClassName('all')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            data-todo-filter="active"
            className={this.calcClassName('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            data-todo-filter="completed"
            className={this.calcClassName('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  todoFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
