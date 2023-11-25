import { Component } from "react";
import PropTypes from "prop-types";

class Task extends Component {
  handleCheckboxClick = ({ target, currentTarget }) => {
    const id = currentTarget.id;
    const li = document.getElementById(id);

    switch (target.tagName) {
      case "INPUT":
        li.classList.toggle("completed");
        break;
      case "SPAN":
        const checkbox = li.querySelector(".toggle");
        checkbox.click();
    }
  };

  render() {
    const p = this.props;

    return (
      <li id={p.id} onClick={this.handleCheckboxClick}>
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
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired
};

Task.defaultProps = {
  description: ""
};

export default Task;
