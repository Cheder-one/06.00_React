import { Component } from "react";
import PropTypes from "prop-types";

import "./taskInput.scss";

class taskInput extends Component {
  render() {
    const p = this.props;

    return (
      <header className="header">
        {p.title ? <h1>{p.title}</h1> : ""}

        <input
          name={p.name}
          value={p.value}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyPress}
        />
      </header>
    );
  }
}

taskInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default taskInput;
