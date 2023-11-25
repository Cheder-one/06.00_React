import { Component } from "react";

import TaskInput from "./app/components/task-input/taskInput";
import TaskList from "./app/components/task-list/taskList";
import { generateId } from "./app/utils";

class App extends Component {
  state = {
    todos: [],
    todoInput: ""
  };

  handleInputChange = ({ target }) => {
    this.setState({
      todoInput: target.value
    });
  };

  handleSubmit = ({ key }) => {
    const { todoInput } = this.state;
    if (!todoInput) return;

    if (key === "Enter") {
      const newTodo = {
        id: generateId(),
        value: todoInput.trim()
      };

      this.setState((prev) => ({
        todos: [...prev.todos, newTodo]
      }));
      this.setState({ todoInput: "" });
    }
  };

  render() {
    const s = this.state;

    return (
      <>
        <TaskInput
          name="todoInput"
          value={this.state.todoInput}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
        <TaskList todos={s.todos} />
      </>
    );
  }
}

export default App;
