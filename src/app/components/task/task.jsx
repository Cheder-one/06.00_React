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
            <span className="description">{p.description}</span>
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
  description: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
};

Task.defaultProps = {
  description: ""
};

export default Task;
