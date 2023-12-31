import { Component } from 'react';

import TaskList from './app/components/taskList/TaskList';
import Footer from './app/components/common/footer/Footer';
import Header from './app/components/common/header/Header';
import { generateTodo } from './app/utils';

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

    let filteredTodos;
    if (state.todoFilter === 'all') {
      filteredTodos = state.todos;
    } else if (state.todoFilter === 'active') {
      filteredTodos = state.todos.filter((todo) => !todo.completed);
    } else {
      filteredTodos = state.todos.filter((todo) => todo.completed);
    }

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
