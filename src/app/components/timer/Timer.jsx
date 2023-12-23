import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  formatTimer,
  getLocalStorage,
  saveLocalStorage,
} from '../../utils';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.timerValue,
      isRunning: false,
      isBlocked: false,
    };

    this.startTime = null;
  }

  componentDidMount() {
    const { id, timerValue } = this.props;

    if (getLocalStorage(id)) {
      this.handleLocalStorage(id, this.startTime, timerValue);
    } else {
      saveLocalStorage(id, this.startTime);
    }

    const { isCompleted } = this.props;
    if (!isCompleted) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  componentDidUpdate(pvp, pvs) {
    this.handleTimeExpiry(pvs);
    this.handleTimerUpdate(pvp);
    this.handleTodoComplete(pvp, pvs);
  }

  componentWillUnmount() {
    clearInterval(this.startTm);
  }

  handleLocalStorage(...args) {
    const [id, startTime, { min, sec }] = args;

    const time = getLocalStorage(id);
    const diff = startTime.getTime() - new Date(time).getTime();
    const secDiff = Math.floor(diff / 1000);

    const timerTime = formatTimer({ min, sec: sec - secDiff });
    this.setState({ time: timerTime });
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
      this.setState(
        {
          time: timerValue,
          isRunning: false,
          isBlocked: false,
        },
        () => !isCompleted && this.startTimer()
      );
      clearInterval(this.startTm);
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
    this.startTime = new Date();

    if (isRunning || isBlocked) return;
    this.setState({ isRunning: true });
    clearInterval(this.pauseTm);

    this.startTm = setInterval(() => {
      this.updateTimer();
    }, 1000);
  };

  updateTimer = () => {
    this.setState(({ time }) => {
      const { min, sec } = time;
      return { time: formatTimer({ min, sec: sec - 1 }) };
    });
  };

  pauseTimer = () => {
    clearInterval(this.startTm);
    this.setState({ isRunning: false });
  };

  render() {
    const { time } = this.state;
    const { min, sec } = time;

    return <span className="todo-timer">{`${min}:${sec}`}</span>;
  }
}

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  timerValue: PropTypes.shape({
    min: PropTypes.string.isRequired,
    sec: PropTypes.string.isRequired,
  }).isRequired,
  isCompleted: PropTypes.bool.isRequired,
};

export default Timer;
