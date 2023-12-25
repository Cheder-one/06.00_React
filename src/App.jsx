import { useState } from 'react';

import { generateTodo } from './app/utils';
import TaskList from './app/components/taskList/TaskList';
import Footer from './app/components/common/footer/Footer';
import Header from './app/components/common/header/Header';

function App() {
  const [todoInput, setTodoInput] = useState('');
  const [todoTimer, setTodoTimer] = useState({ min: '', sec: '' });
  const [todoFilter, setTodoFilter] = useState('all');
  const [todos, setTodos] = useState(generateTodo(3));

  const handleInputChange = (callback) => {
    setTodoInput(callback);
  };

  const handleTimerChange = (callback) => {
    setTodoTimer(callback);
  };

  const clearInput = () => {
    setTodoInput('');
    setTodoTimer({ min: '', sec: '' });
  };

  const handleTodoSubmit = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    clearInput();
  };

  const handleTodoToggle = (callback) => {
    setTodos(callback);
  };

  const handleTimerToggle = (callback) => {
    setTodos(callback);
  };

  const handleTodoEditSubmit = (callback) => {
    setTodos(callback);
  };

  const handleTodoDelete = (callback) => {
    setTodos(callback);
  };

  const handleTodoClearComplete = (callback) => {
    setTodos(callback);
  };

  const handleFilterChange = (filter) => {
    setTodoFilter(filter);
  };

  let filteredTodos;
  if (todoFilter === 'all') {
    filteredTodos = todos;
  } else if (todoFilter === 'active') {
    filteredTodos = todos.filter((todo) => !todo.isCompleted);
  } else {
    filteredTodos = todos.filter((todo) => todo.isCompleted);
  }

  return (
    <>
      <Header
        title="Todos"
        inputValue={todoInput}
        timerValue={todoTimer}
        onInputChange={handleInputChange}
        onTimerChange={handleTimerChange}
        onTodoSubmit={handleTodoSubmit}
      />
      <TaskList
        todos={filteredTodos}
        onTodoToggle={handleTodoToggle}
        onTimerToggle={handleTimerToggle}
        onTodoEditSubmit={handleTodoEditSubmit}
        onTodoDelete={handleTodoDelete}
      />
      <Footer
        todos={todos}
        todoFilter={todoFilter}
        todoCount={todos.length}
        onFilterItems={handleFilterChange}
        onClearComplete={handleTodoClearComplete}
      />
    </>
  );
}

export default App;
