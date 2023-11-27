import { Component } from "react";

import "./tasksFilter.scss";

class TasksFilter extends Component {
  state = {
    selectedEl: "all-todo"
  };

  handleFilterClick = ({ target }) => {
    this.setState({ selectedEl: target.className });
  };

  calcElemClass = (className) => {
    const { selectedEl } = this.state;

    return className.includes(selectedEl)
      ? `${className} selected`
      : className;
  };

  render() {
    const { selectedEl } = this.state;

    return (
      <ul className="filters" onClick={this.handleFilterClick}>
        <li>
          <button className={this.calcElemClass("all-todo")}>
            All
          </button>
        </li>
        <li>
          <button className={this.calcElemClass("active-todo")}>
            Active
          </button>
        </li>
        <li>
          <button className={this.calcElemClass("completed-todo")}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TasksFilter;
