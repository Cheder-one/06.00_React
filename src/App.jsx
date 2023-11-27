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

  handleInputChange = (obj) => {
    this.setState(obj);
  };

  handleTodoSubmit = (newTodo) => {
    this.setState((prev) => ({
      todos: [...prev.todos, newTodo]
    }));
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
        />
        <Footer />
      </>
    );
  }
}

export default App;
