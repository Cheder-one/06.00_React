import { Component } from "react";
import PropTypes from "prop-types";

import "./tasksFilter.scss";

class TasksFilter extends Component {
  handleFilterChange = (event) => {
    const { dataset } = event.target;
    const { onFilterChange } = this.props;

    if (dataset.todoFilter) {
      onFilterChange(dataset.todoFilter);
    }
  };

  calcClassName = (className) => {
    return className === this.props.todoFilter
      ? `${className} selected`
      : `${className}`;
  };

  render() {
    return (
      <ul className="filters" onClick={this.handleFilterChange}>
        <li>
          <button
            data-todo-filter="all"
            className={this.calcClassName("all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            data-todo-filter="active"
            className={this.calcClassName("active")}
          >
            Active
          </button>
        </li>
        <li>
          <button
            data-todo-filter="completed"
            className={this.calcClassName("completed")}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  todos: PropTypes.array.isRequired,
  todoFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default TasksFilter;
