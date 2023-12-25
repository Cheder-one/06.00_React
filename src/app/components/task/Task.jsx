import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import Timer from '../timer/Timer';
import TaskInput from '../taskInput/TaskInput';
import { formatTimer, getDuration } from '../../utils';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      editableId: '',
      newValue: props.value,
      newTodoTimer: props.timerValue,
      duration: getDuration(props.created),
    };
    this.timerRef = createRef();
  }

  componentDidMount() {
    this.startDurationInterval();
  }

  componentDidUpdate(pvp) {
    const { value, timerValue } = this.props;

    if (pvp.value !== value || pvp.timerValue !== timerValue) {
      this.setState({
        newValue: value,
        newTodoTimer: timerValue,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.durationInterval);
  }

  handleTodoToggleComplete = (itemId) => {
    const { onTodoToggle } = this.props;

    const toggleTodo = (prev) => {
      const toggled = prev.todos.map((todo) =>
        todo.id === itemId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return { todos: toggled };
    };
    onTodoToggle(toggleTodo);
  };

  toggleTodoEdit = () => {
    this.setState((prev) => ({ isEdit: !prev.isEdit }));
  };

  handleTodoEdit = (editableId) => {
    this.toggleTodoEdit();
    this.setState((prev) => ({ ...prev, editableId }));
  };

  handleInputChange = (callback) => {
    this.setState(callback);
  };

  handleTimerChange = (callback) => {
    this.setState(callback);
  };

  handleEditedTodoSubmit = () => {
    const { editableId, newValue, newTodoTimer } = this.state;
    const { min, sec } = newTodoTimer;

    const todo = {
      id: editableId,
      value: newValue,
      timerValue: formatTimer({ min, sec }),
    };

    this.updateTodo(todo);
    this.toggleTodoEdit();
  };

  updateTodo = (newTodo) => {
    const { onTodoEditSubmit } = this.props;

    const editTodo = (prev) => {
      const edited = prev.todos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              value: newTodo.value,
              timerValue: newTodo.timerValue,
            }
          : todo
      );

      return { todos: edited };
    };
    onTodoEditSubmit(editTodo);
  };

  handleTodoDelete = (itemId) => {
    const { onTodoDelete } = this.props;

    const filterTodos = (prev) => {
      const filtered = prev.todos.filter(({ id }) => id !== itemId);

      return { todos: filtered };
    };
    onTodoDelete(filterTodos);
  };

  toggleTodoTimer = ({ target }) => {
    const { name } = target;
    if (name === 'start') {
      this.timerRef.current.startTimer();
    }
    if (name === 'pause') {
      this.timerRef.current.pauseTimer();
    }
  };

  startDurationInterval() {
    this.durationInterval = setInterval(() => {
      const { created } = this.props;
      this.setState({
        duration: getDuration(created),
      });
    }, 5000);
  }

  calcClassName() {
    const { isCompleted } = this.props;
    const { isEdit } = this.state;

    if (isEdit) return 'editing';
    if (isCompleted) return 'completed';
    return '';
  }

  render() {
    const { id, ...props } = this.props;
    const { isEdit, duration, newValue, newTodoTimer } = this.state;

    return (
      <li id={id} className={this.calcClassName()}>
        <div className="view">
          <input
            id={`_${id}`}
            className="toggle"
            type="checkbox"
            checked={props.isCompleted}
            onChange={() => this.handleTodoToggleComplete(id)}
          />
          <label htmlFor={`_${id}`}>
            <span className="title">{props.value}</span>
            <span className="description">
              <button
                name="start"
                type="button"
                className="icon icon-play"
                onClick={this.toggleTodoTimer}
              />
              <button
                name="pause"
                type="button"
                className="icon icon-pause"
                onClick={this.toggleTodoTimer}
              />
              <Timer
                id={id}
                ref={this.timerRef}
                timerValue={props.timerValue}
                isRunning={props.isRunning}
                isBlocked={props.isBlocked}
                isCompleted={props.isCompleted}
                onTimerToggle={props.onTimerToggle}
              />
            </span>
            <span className="description">{duration}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={() => this.handleTodoEdit(id)}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => this.handleTodoDelete(id)}
          />
        </div>
        {isEdit && (
          <TaskInput
            name="newTodo"
            value={newValue}
            timerValue={newTodoTimer}
            className="edit"
            placeholder=""
            autoFocus
            onInputChange={this.handleInputChange}
            onTimerChange={this.handleTimerChange}
            onTodoSubmit={this.handleEditedTodoSubmit}
          />
        )}
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  created: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default Task;
