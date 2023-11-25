import { Component } from "react";
import PropTypes from "prop-types";

import "./taskList.scss";
import Task from "../task/task";

class TaskList extends Component {
  render() {
    const p = this.props;

    return (
      <ul className="todo-list">
        {p.todos.map(({ id, value }) => (
          <Task key={id} id={id} value={value} created={0} />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TaskList;
