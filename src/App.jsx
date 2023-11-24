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
      todoInput: target.value.trim()
    });
  };

  handleSubmit = ({ key }) => {
    if (key === "Enter") {
      this.setState((prev) => ({
        todos: [
          ...prev.todos,
          { id: generateId(), value: this.state.todoInput }
        ]
      }));
      this.setState({ todoInput: "" });
    }
  };

  render() {
    const s = this.state;

    return (
      <>
        <TaskInput
          title="Todos"
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
