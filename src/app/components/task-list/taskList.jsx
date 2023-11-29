import { Component } from "react";
import PropTypes from "prop-types";

import "./taskList.scss";
import Task from "../task/task";

class TaskList extends Component {
  handleTodoToggle = (itemId) => {
    const toggleTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      return { ...prev, todos: toggled };
    };
    this.props.onTodoToggle(toggleTodo);
  };

  handleTodoEditSubmit = ({ newTodo }) => {
    const editTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? { ...todo, value: newTodo.value }
          : todo
      );

      return { ...prev, todos: edited };
    };
    this.props.onTodoEditSubmit(editTodo);
  };

  handleTodoDelete = (itemId) => {
    const filterTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);
      return { ...prev, todos: filtered };
    };
    this.props.onTodoDelete(filterTodos);
  };

  render() {
    const props = this.props;

    return (
      <ul className="todo-list">
        {props.todos.map((todo) => (
          <Task
            id={todo.id}
            key={todo.id}
            value={todo.value}
            created={todo.created}
            isCompleted={todo.completed}
            onTodoSubmit={props.onTodoSubmit}
            onTodoToggle={this.handleTodoToggle}
            onTodoEditSubmit={this.handleTodoEditSubmit}
            onTodoDelete={this.handleTodoDelete}
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
