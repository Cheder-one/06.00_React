import { Component } from "react";

import TasksFilter from "../../tasks-filter/tasksFilter";
import "./footer.scss";

class Footer extends Component {
  handleBtnClearClick = () => {
    //
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {this.props.todoCount} items left
        </span>
        <TasksFilter />
        <button
          className="clear-completed"
          onClick={this.handleBtnClearClick}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
