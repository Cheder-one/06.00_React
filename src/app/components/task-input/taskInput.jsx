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
          autoFocus
          name={p.name}
          value={p.value}
          className="new-todo"
          placeholder={p.placeholder}
          onChange={this.props.onChange}
          onKeyDown={this.props.onSubmit}
        />
      </header>
    );
  }
}

taskInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

taskInput.defaultProps = {
  title: "Todos",
  placeholder: "What needs to be done?"
};

export default taskInput;
