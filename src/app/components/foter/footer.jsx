import { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">1 items left</span>
        {/*  */}
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

export default Footer;
