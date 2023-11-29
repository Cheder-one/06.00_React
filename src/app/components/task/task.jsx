import { Component } from "react";
import PropTypes from "prop-types";

import TaskInput from "../task-input/taskInput";
import { getDuration } from "../../utils";
import "./task.scss";

class Task extends Component {
  state = {
    isEdit: false,
    editableId: "",
    newTodoValue: this.props.value,
    duration: getDuration(this.props.created)
  };

  componentDidMount() {
    this.durationInterval = setInterval(() => {
      this.setState({
        duration: getDuration(this.props.created)
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.durationInterval);
  }

  handleTodoClick = ({ currentTarget }) => {
    const id = currentTarget.id;
    this.props.onTodoToggle(id);
  };

  toggleTodoEdit = () => {
    this.setState((prev) => ({ isEdit: !prev.isEdit }));
  };

  handleTodoEdit = (e, editableId) => {
    e.preventDefault();
    this.toggleTodoEdit();
    this.setState((prev) => ({ ...prev, editableId }));
  };

  handleInputChange = ({ name, value }) => {
    this.setState((prev) => ({ ...prev, [name]: value }));
  };

  handleEditedTodoSubmit = () => {
    const { editableId, newTodoValue } = this.state;
    const newTodo = {
      id: editableId,
      value: newTodoValue
    };

    this.props.onTodoEditSubmit({ newTodo });
    this.toggleTodoEdit();
  };

  handleTodoDelete = (e, id) => {
    e.preventDefault();
    this.props.onTodoDelete(id);
  };

  calcClassName() {
    const { isCompleted } = this.props;
    const { isEdit } = this.state;
    return isEdit ? "editing" : isCompleted ? "completed" : "";
  }

  render() {
    const { id, ...props } = this.props;
    const { isEdit, newTodoValue, duration } = this.state;

    return (
      <li
        id={id}
        className={this.calcClassName()}
        onClick={this.handleTodoClick}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={props.isCompleted}
            onChange={() => null}
          />
          <label>
            <span className="description">{props.value}</span>
            <span className="created">{duration}</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={(e) => this.handleTodoEdit(e, id)}
          />
          <button
            className="icon icon-destroy"
            onClick={(e) => this.handleTodoDelete(e, id)}
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
  onTodoDelete: PropTypes.func.isRequired
};

export default Task;
