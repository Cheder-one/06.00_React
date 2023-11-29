import { Component } from "react";
import PropTypes from "prop-types";

import "./tasksFilter.scss";

class TasksFilter extends Component {
  state = {
    selectedFilter: "all"
  };

  handleFilterChange = ({ target }) => {
    const props = this.props;
    const { todoFilter } = target.dataset;
    const { selectedFilter } = this.state;

    if (todoFilter) {
      this.setState({ selectedFilter: todoFilter });
    }

    switch (selectedFilter) {
      case "all":
        console.log("call: ALL");

        props.onFilterItems({
          todos: [
            { id: "2", value: "Active", completed: false },
            { id: "3", value: "completed", completed: true }
          ]
        });
        break;
      case "active":
        console.log("call: ACTIVE");

        props.onFilterItems({
          todos: [{ id: "2", value: "Active", completed: false }]
        });
        break;
      case "completed":
        console.log("call: COMPLETED");

        props.onFilterItems({
          todos: [{ id: "3", value: "completed", completed: true }]
        });
        break;
    }
  };

  calcClassName = (className) => {
    return className === this.state.selectedFilter
      ? `${className} selected`
      : `${className}`;
  };

  render() {
    const { selectedFilter } = this.state;
    // console.log(selectedFilter);

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
  onFilterItems: PropTypes.func.isRequired
};

// class Utils extends TasksFilter {
//   //
// }

export default TasksFilter;
