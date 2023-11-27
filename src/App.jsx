import { Component } from "react";

import TaskList from "./app/components/task-list/taskList";
import Footer from "./app/components/common/footer/footer";
import Header from "./app/components/common/header/header";
import { generateId } from "./app/utils";

class App extends Component {
  state = {
    todoInput: "",
    todos: [
      {
        id: generateId(),
        value: "Новая задача",
        completed: false
      }
    ]
  };

  handleInputChange = (callback) => {
    this.setState(callback);
  };

  handleTodoSubmit = ({ newTodo }) => {
    this.setState((prev) => ({
      ...prev,
      todos: [...prev.todos, newTodo]
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

  render() {
    const state = this.state;

    return (
      <>
        <Header
          title="Todos"
          inputValue={state.todoInput}
          onInputChange={this.handleInputChange}
          onTodoSubmit={this.handleTodoSubmit}
        />
        <TaskList
          todos={state.todos}
          onTodoSubmit={this.handleTodoSubmit}
          onTodoToggle={this.handleTodoToggle}
          onTodoEditSubmit={this.handleTodoEditSubmit}
          onTodoDelete={this.handleTodoDelete}
        />
        <Footer
          todoCount={state.todos.length}
          onClearComplete={this.handleTodoClearComplete}
        />
      </>
    );
  }
}

export default App;
