/* eslint-disable no-nested-ternary */

import { Component } from 'react';
import PropTypes from 'prop-types';

import TaskInput from '../task-input/taskInput';
import { getDuration } from '../../utils';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      editableId: '',
      newTodoValue: props.value,
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

  // handleTodoEditCancel = () => {
  //   this.toggleTodoEdit();
  // }

  // handlePress = (event) => {
  //   if (event.key === 'Enter') {
  //     this.toggleTodoEdit();
  //   }
  // };

  handleInputChange = ({ name, value }) => {
    if (value)
      this.setState((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  handleEditedTodoSubmit = () => {
    const { onTodoEditSubmit } = this.props;
    const { editableId, newTodoValue } = this.state;

    const newTodo = {
      id: editableId,
      value: newTodoValue,
    };

    onTodoEditSubmit({ newTodo });
    this.toggleTodoEdit();
  };

  handleTodoDelete = (id) => {
    const { onTodoDelete } = this.props;
    onTodoDelete(id);
  };

  calcClassName() {
    const { isCompleted } = this.props;
    const { isEdit } = this.state;
    return isEdit ? 'editing' : isCompleted ? 'completed' : '';
  }

  render() {
    const { id, ...props } = this.props;
    const { isEdit, newTodoValue, duration } = this.state;

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
            <button
              type="button"
              className="description"
              onClick={() => this.handleTodoEdit(id)}
            >
              {props.value}
            </button>
            <span className="created">{duration}</span>
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
            name="newTodoValue"
            value={newTodoValue}
            autoFocus
            className="edit"
            placeholder=""
            onInputChange={this.handleInputChange}
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
  created: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onTodoToggle: PropTypes.func.isRequired,
  onTodoEditSubmit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default Task;
