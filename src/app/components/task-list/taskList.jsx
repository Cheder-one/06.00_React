import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './taskList.scss';

class TaskList extends Component {
  handleTodoToggle = (itemId) => {
    const { onTodoToggle } = this.props;

    const toggleTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      return { ...prev, todos: toggled };
    };
    onTodoToggle(toggleTodo);
  };

  handleTodoEditSubmit = ({ newTodo }) => {
    const { onTodoEditSubmit } = this.props;

    const editTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? { ...todo, value: newTodo.value }
          : todo
      );

      return { ...prev, todos: edited };
    };
    onTodoEditSubmit(editTodo);
  };

  handleTodoDelete = (itemId) => {
    const { onTodoDelete } = this.props;

    const filterTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);
      return { ...prev, todos: filtered };
    };
    onTodoDelete(filterTodos);
  };

  render() {
    const { props } = this;

    return (
      <ul className="todo-list">
        {props.todos.map((todo) => (
          <Task
            id={todo.id}
            key={todo.id}
            value={todo.value}
            created={todo.created}
            isCompleted={todo.completed}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default TaskList;
