import { Component } from "react";
import PropTypes from "prop-types";

class Task extends Component {
  render() {
    const p = this.props;

    return (
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{p.value}</span>
            <span className="created">{p.created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  value: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired
};

Task.defaultProps = {
  description: ""
};

export default Task;
