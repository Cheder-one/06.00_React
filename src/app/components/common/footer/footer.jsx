import { Component } from "react";
import PropTypes from "prop-types";

import TasksFilter from "../../tasks-filter/tasksFilter";
import "./footer.scss";

class Footer extends Component {
  handleClearCompleteClick = () => {
    const filterCompleted = (prev) => {
      const filtered = prev.todos.filter(
        (todo) => todo.completed === false
      );
      return { ...prev, todos: filtered };
    };

    this.props.onClearComplete(filterCompleted);
  };

  render() {
    const props = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.todoCount} items left
        </span>

        <TasksFilter
          todos={props.todos}
          onFilterItems={props.onFilterItems}
        />

        <button
          className="clear-completed"
          onClick={this.handleClearCompleteClick}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  todoCount: PropTypes.number.isRequired,
  onFilterItems: PropTypes.func.isRequired,
  onClearComplete: PropTypes.func.isRequired
};

export default Footer;
