import { Component } from 'react';
import PropTypes from 'prop-types';

import TaskInput from '../taskInput/TaskInput';
import { formatTimer, getDuration } from '../../utils';
import Timer from '../timer/Timer';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      editableId: '',
      newTodo: props.value,
      newTodoTimer: props.timer,
      duration: getDuration(props.created),
    };
  }

  componentDidMount() {
    this.durationInterval = setInterval(() => {
      const { created } = this.props;

      this.setState({
        duration: getDuration(created),
      });
    }, 5000);
  }

  componentDidUpdate(pvp) {
    const { value, timer } = this.props;
    if (pvp.value !== value || pvp.timer !== timer) {
      this.setState({
        newTodo: value,
        newTodoTimer: timer,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.durationInterval);
  }

  handleCheckboxChange = (id) => {
    const { onTodoToggle } = this.props;
    onTodoToggle(id);
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
    const { editableId, newTodo, newTodoTimer } = this.state;
    const { onTodoEditSubmit } = this.props;
    const { min, sec } = newTodoTimer;

    const todo = {
      id: editableId,
      value: newTodo,
      timer: formatTimer({ min, sec }),
    };

    onTodoEditSubmit({ newTodo: todo });
    this.toggleTodoEdit();
  };

  handleTodoDelete = (id) => {
    const { onTodoDelete } = this.props;
    onTodoDelete(id);
  };

  calcClassName() {
    const { isCompleted } = this.props;
    const { isEdit } = this.state;

    if (isEdit) return 'editing';
    if (isCompleted) return 'completed';
    return '';
  }

  render() {
    const { id, ...props } = this.props;
    const { isEdit, duration, newTodo, newTodoTimer } = this.state;

    return (
      <li id={id} className={this.calcClassName()}>
        <div className="view">
          <input
            id={`_${id}`}
            className="toggle"
            type="checkbox"
            checked={props.isCompleted}
            onChange={() => this.handleCheckboxChange(id)}
          />
          <label htmlFor={`_${id}`}>
            <span className="title">{props.value}</span>
            <span className="description">
              <button type="button" className="icon icon-play" />
              <button type="button" className="icon icon-pause" />
              <Timer value={props.timer} />
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
            value={newTodo}
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
  timer: PropTypes.shape({
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
