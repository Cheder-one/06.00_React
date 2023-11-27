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
    // const toggleTodo = (prev) => {
    //   const toggled = prev.todos.map((todo) =>
    //     todo.id === itemId
    //       ? { ...todo, completed: !todo.completed }
    //       : todo
    //   );
    //   return { ...prev, todos: toggled };
    // };

    this.setState(callback);
  };

  handleTodoEditSubmit = (callback) => {
    // const editTodo = (prev) => {
    //   const edited = prev.todos.map((todo) =>
    //     todo.id === newTodo.id
    //       ? { ...todo, value: newTodo.value }
    //       : todo
    //   );
    //   return { ...prev, todos: edited };
    // };

    this.setState(callback);
  };

  handleTodoDelete = (callback) => {
    // const filterTodos = (prev) => {
    //   const filtered = prev.todos.filter(({ id }) => id !== itemId);
    //   return { ...prev, todos: filtered };
    // };
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
        <Footer todoCount={state.todos.length} />
      </>
    );
  }
}

export default App;
