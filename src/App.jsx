/* eslint-disable no-nested-ternary */

import { Component } from 'react';

import TaskList from './app/components/task-list/taskList';
import Footer from './app/components/common/footer/footer';
import Header from './app/components/common/header/header';
import { generateTodo } from './app/utils';

xss;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoInput: '',
      todoFilter: 'all',
      todos: generateTodo(),
    };
  }

  handleInputChange = (callback) => {
    this.setState(callback);
  };

  handleTodoSubmit = ({ newTodo }) => {
    this.setState((prev) => ({
      todos: [...prev.todos, newTodo],
    }));
  };

  handleTodoToggle = (callback) => {
    this.setState(callback);
  };

  handleTodoEditSubmit = (callback) => {
    this.setState(callback);
  };

  handleTodoDelete = (callback) => {
    this.setState(callback);
  };

  handleTodoClearComplete = (callback) => {
    this.setState(callback);
  };

  handleFilterChange = (todoFilter) => {
    this.setState({ todoFilter });
  };

  render() {
    const { state } = this;

    const filteredTodos =
      state.todoFilter === 'all'
        ? state.todos
        : state.todoFilter === 'active'
          ? state.todos.filter((todo) => !todo.completed)
          : state.todos.filter((todo) => todo.completed);

    return (
      <>
        <Header
          title="Todos"
          inputValue={state.todoInput}
          onInputChange={this.handleInputChange}
          onTodoSubmit={this.handleTodoSubmit}
        />
        <TaskList
          todos={filteredTodos}
          onTodoToggle={this.handleTodoToggle}
          onTodoEditSubmit={this.handleTodoEditSubmit}
          onTodoDelete={this.handleTodoDelete}
        />
        <Footer
          todos={state.todos}
          todoFilter={state.todoFilter}
          todoCount={state.todos.length}
          onFilterItems={this.handleFilterChange}
          onClearComplete={this.handleTodoClearComplete}
        />
      </>
    );
  }
}

export default App;
