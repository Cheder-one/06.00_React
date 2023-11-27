import { Component } from "react";

// import TaskInput from "./app/components/task-input/taskInput";
import TaskList from "./app/components/task-list/taskList";
import Footer from "./app/components/footer/footer";
import Header from "./app/components/UI/header/header";
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

  handleInputChange = ({ name, value }) => {
    this.setState((prev) => ({ ...prev, [name]: value }));
  };

  handleTodoSubmit = ({ newTodo }) => {
    this.setState((prev) => ({
      ...prev,
      todos: [...prev.todos, newTodo]
    }));
  };

  handleTodoToggle = (itemId) => {
    const toggleTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return { ...prev, todos: toggled };
    };

    this.setState(toggleTodo);
  };

  handleTodoEditSubmit = ({ newTodo }) => {
    console.log(newTodo);
    const editTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? { ...todo, value: newTodo.value }
          : todo
      );
      return { ...prev, todos: edited };
    };

    this.setState(editTodo);
  };

  handleTodoDelete = (itemId) => {
    const filterTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);
      return { ...prev, todos: filtered };
    };
    this.setState(filterTodos);
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
        <Footer />
      </>
    );
  }
}

export default App;
