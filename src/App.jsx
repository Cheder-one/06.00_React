import { Component } from "react";

import TaskInput from "./app/components/task-input/taskInput";
import TaskList from "./app/components/task-list/taskList";

class App extends Component {
  state = {
    todoInput: ""
  };

  handleSubmit = (value) => {
    console.log(value);
  };

  render() {
    const s = this.state;

    return (
      <>
        <TaskInput
          title="Todos"
          name="todoInput"
          value={s.todoInput}
          onSubmit={this.handleSubmit}
        />
        <TaskList description={s.inputValue} />
      </>
    );
  }
}

export default App;
