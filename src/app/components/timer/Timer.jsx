import { Component } from 'react';
import PropTypes from 'prop-types';

import { formatTimer } from '../../utils';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // prettier-ignore
    const { value  } = this.props;
    const { min, sec } = formatTimer({ ...value });

    return <span className="todo-timer">{`${min}:${sec}`}</span>;
  }
}

Timer.propTypes = {
  value: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
};

export default Timer;
