import PropTypes from 'prop-types';
import { createRef, useEffect, useState } from 'react';

import Timer from '../timer/Timer';
import TaskInput from '../taskInput/TaskInput';
import { formatTimer, getDuration } from '../../utils';

function Task({
  id,
  value,
  timerValue,
  created,
  isRunning,
  isBlocked,
  isCompleted,
  onTodoToggle,
  onTimerToggle,
  onTodoEditSubmit,
  onTodoDelete,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState('');
  const [newValue, setNewValue] = useState(value);
  const [newTimer, setNewTimer] = useState(timerValue);
  const [duration, setDuration] = useState(getDuration(created));

  const timerRef = createRef();

  function startDurationInterval() {
    const durationInterval = setInterval(() => {
      setDuration(getDuration(created));
    }, 5000);

    return () => {
      clearInterval(durationInterval);
    };
  }

  useEffect(() => {
    const clearTimer = startDurationInterval();

    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    setNewValue(value);
    setNewTimer(timerValue);
  }, [value, timerValue]);

  const handleTodoToggle = (itemId) => {
    const toggleTodo = (prevTodos) => {
      const toggled = prevTodos.map((todo) =>
        todo.id === itemId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return toggled;
    };
    onTodoToggle(toggleTodo);
  };

  const handleTimerToggle = (itemId, fieldName, status) => {
    const toggleTimer = (prevTodos) => {
      const toggled = prevTodos.map((todo) => {
        return todo.id === itemId
          ? { ...todo, [fieldName]: status }
          : todo;
      });

      return toggled;
    };
    onTimerToggle(toggleTimer);
  };

  const handleTodoUpdate = (newTodo) => {
    const editTodo = (prevTodos) => {
      const edited = prevTodos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              value: newTodo.value,
              timerValue: newTodo.timerValue,
            }
          : todo
      );

      return edited;
    };
    onTodoEditSubmit(editTodo);
  };

  const handleTodoDelete = (itemId) => {
    const filterTodos = (prevTodos) => {
      const filtered = prevTodos.filter((todo) => todo.id !== itemId);

      return filtered;
    };
    onTodoDelete(filterTodos);
  };

  const toggleTodoEdit = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
  };

  const handleTodoEdit = (itemId) => {
    toggleTodoEdit();
    setEditableId(itemId);
  };

  useEffect(() => {
    handleTimerToggle(id, 'isRunning', !isEdit);
  }, [isEdit]);

  const handleInputChange = (callback) => {
    setNewValue(callback);
  };

  const handleTimerChange = (callback) => {
    setNewTimer(callback);
  };

  const handleEditedTodoSubmit = () => {
    const { min, sec } = newTimer;

    const todo = {
      id: editableId,
      value: newValue,
      timerValue: formatTimer({ min, sec }),
    };

    handleTodoUpdate(todo);
    toggleTodoEdit();
  };

  const toggleTodoTimer = ({ target }) => {
    const { name } = target;
    if (name === 'start') {
      timerRef.current.startTimer();
    }
    if (name === 'pause') {
      timerRef.current.pauseTimer();
    }
  };

  const calcClassName = () => {
    if (isEdit) return 'editing';
    if (isCompleted) return 'completed';
    return '';
  };

  return (
    <li id={id} className={calcClassName()}>
      <div className="view">
        <input
          id={`_${id}`}
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleTodoToggle(id)}
        />
        <label htmlFor={`_${id}`}>
          <span className="title">{value}</span>
          <span className="description">
            <button
              name="start"
              type="button"
              className="icon icon-play"
              onClick={toggleTodoTimer}
            />
            <button
              name="pause"
              type="button"
              className="icon icon-pause"
              onClick={toggleTodoTimer}
            />
            <Timer
              id={id}
              ref={timerRef}
              timerValue={timerValue}
              isRunning={isRunning}
              isBlocked={isBlocked}
              isCompleted={isCompleted}
              onTimerToggle={handleTimerToggle}
            />
          </span>
          <span className="description">{duration}</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => handleTodoEdit(id)}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => handleTodoDelete(id)}
        />
      </div>
      {isEdit && (
        <TaskInput
          id={id}
          name="newValue"
          value={newValue}
          initValue={{ todo: value, timer: timerValue }}
          timerValue={newTimer}
          className="edit"
          placeholder=""
          autoFocus
          onInputChange={handleInputChange}
          onTodoEditToggle={toggleTodoEdit}
          onTimerChange={handleTimerChange}
          onTimerToggle={handleTimerToggle}
          onTodoSubmit={handleEditedTodoSubmit}
        />
      )}
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  created: PropTypes.string.isRequired,
  isRunning: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTimerToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default Task;
