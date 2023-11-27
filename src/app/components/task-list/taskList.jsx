import { Component } from "react";
import PropTypes from "prop-types";

import "./taskList.scss";
import Task from "../task/task";

class TaskList extends Component {
  state = {
    todoInputEdit: ""
  };

  handleInputEdit = (obj) => {
    this.setState(obj);
  };

  render() {
    const props = this.props;
    const { todoInputEdit } = this.state;

    return (
      <ul className="todo-list">
        {props.todos.map(({ id, value }) => (
          <Task
            id={id}
            key={id}
            value={value}
            created={0}
            valueEdit={todoInputEdit}
            onInputChange={this.handleInputEdit}
            onTodoSubmit={this.props.onTodoSubmit}
          />
        ))}
      </ul>
    );
  }
}

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoSubmit: PropTypes.func.isRequired
};

export default TaskList;
