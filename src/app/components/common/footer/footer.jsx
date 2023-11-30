import { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../../tasks-filter/tasksFilter';
import './footer.scss';

class Footer extends Component {
  handleFilterChange = (selectedFilter) => {
    const { onFilterItems } = this.props;

    onFilterItems(selectedFilter);
  };

  handleClearCompletedClick = () => {
    const { onClearComplete } = this.props;

    const filterCompleted = (prev) => {
      const filtered = prev.todos.filter(
        (todo) => todo.completed === false
      );
      return { ...prev, todos: filtered };
    };

    onClearComplete(filterCompleted);
  };

  render() {
    const { props } = this;

    return (
      <footer className="footer">
        <span className="todo-count">
          {props.todoCount} items left
        </span>
        <TasksFilter
          todoFilter={props.todoFilter}
          todos={props.todos}
          onFilterChange={this.handleFilterChange}
        />
        <button
          type="button"
          className="clear-completed"
          onClick={this.handleClearCompletedClick}
        >
          Clear completed
        </button>
      </footer>
    );
  }
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
