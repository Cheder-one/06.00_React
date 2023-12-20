/* eslint-disable react/no-unused-class-component-methods */
import { Component } from 'react';
import PropTypes from 'prop-types';

import { formatTimer } from '../../utils';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.timerValue,
      isRunning: false,
      isBlocked: false,
    };
  }

  componentDidMount() {
    const { isCompleted } = this.props;
    if (!isCompleted) {
      this.startTimer();
    }
  }

  componentDidUpdate(pvp, pvs) {
    this.handleTimeExpiry(pvs);
    this.handleTimerUpdate(pvp);
    this.handleTodoComplete(pvp, pvs);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleTimeExpiry(pvs) {
    const { time } = this.state;
    const { min, sec } = time;
    const prevMin = pvs.time.min;
    const prevSec = pvs.time.sec;

    const totalTime = Number(min) + Number(sec);
    const prevTotalTime = Number(prevMin) + Number(prevSec);

    if (totalTime <= 0 && totalTime !== prevTotalTime) {
      this.pauseTimer();
      this.setState({
        isBlocked: true,
        time: { min: '00', sec: '00' },
      });
    }
  }

  handleTimerUpdate(pvp) {
    const { timerValue, isCompleted } = this.props;

    if (pvp.timerValue !== timerValue) {
      const callback = () => !isCompleted && this.startTimer();
      this.setState(
        {
          time: timerValue,
          isRunning: false,
          isBlocked: false,
        },
        callback
      );
    }
  }

  handleTodoComplete = (pvp) => {
    const { isCompleted } = this.props;
    const wasCompleted = pvp.isCompleted;

    if (isCompleted && !wasCompleted) {
      this.pauseTimer();
    }
    if (!isCompleted && wasCompleted) {
      this.startTimer();
    }
  };

  startTimer = () => {
    const { isRunning, isBlocked } = this.state;

    if (isRunning || isBlocked) return;
    this.setState({ isRunning: true });

    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  };

  updateTimer = () => {
    this.setState((prev) => {
      const { time } = prev;
      const { min, sec } = time;
      return { time: formatTimer({ min, sec: sec - 1 }) };
    });
  };

  render() {
    const { time } = this.state;
    const { min, sec } = time;

    return <span className="todo-timer">{`${min}:${sec}`}</span>;
  }
}

Timer.propTypes = {
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default Timer;
