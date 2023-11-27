import { Component } from "react";
import PropTypes from "prop-types";

import "./taskList.scss";
import Task from "../task/task";

class TaskList extends Component {
  render() {
    const props = this.props;

    return (
      <ul className="todo-list">
        {props.todos.map(({ id, value }) => (
          <Task
            id={id}
            key={id}
            value={value}
            created={0}
            onTodoSubmit={props.onTodoSubmit}
            onTodoToggle={props.onTodoToggle}
            onTodoEditSubmit={props.onTodoEditSubmit}
            onTodoDelete={props.onTodoDelete}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoSubmit: PropTypes.func.isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired
};

export default TaskList;
