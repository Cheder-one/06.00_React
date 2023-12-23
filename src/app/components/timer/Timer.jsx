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
      // isRunning: false,
      // isBlocked: false,
    };
  }

  componentDidMount() {
    const { id, timerValue, isCompleted, isRunning } = this.props;
    const { min, sec } = timerValue;

    if (isRunning && !isCompleted) {
      this.startTimer('skip');
    } else {
      this.pauseTimer();
    }

    if (!getLocalStorage(id)) {
      saveLocalStorage(id, new Date());
    } else {
      const initTime = getLocalStorage(id);
      const diff =
        new Date().getTime() - new Date(initTime).getTime();
      const secDiff = Math.floor(diff / 1000);

      const timerTime = formatTimer({ min, sec: sec - secDiff });
      this.setState({ time: timerTime });
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
    const { id, onTimerToggle } = this.props;
    // prettier-ignore
    const { time : { min, sec } } = this.state;
    const prevMin = pvs.time.min;
    const prevSec = pvs.time.sec;

    const totalTime = Number(min) + Number(sec);
    const prevTotalTime = Number(prevMin) + Number(prevSec);

    if (totalTime <= 0 && totalTime !== prevTotalTime) {
      this.pauseTimer();

      onTimerToggle(id, 'isBlocked', true);
      this.setState({
        // isBlocked: true,
        time: { min: '00', sec: '00' },
      });
    }
  }

  handleTimerUpdate(pvp) {
    const { id, timerValue, isCompleted, onTimerToggle } = this.props;

    if (pvp.timerValue !== timerValue) {
      this.setState(
        {
          time: timerValue,
          // isRunning: false,
          // isBlocked: false,
        },
        () => !isCompleted && this.startTimer()
      );
      onTimerToggle(id, 'isRunning', false);
      onTimerToggle(id, 'isBlocked', false);

      clearInterval(this.timer);
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

  startTimer = (isSkip) => {
    const { id, isRunning, isBlocked, onTimerToggle } = this.props;

    if (!isSkip) {
      if (isRunning || isBlocked) return;
      onTimerToggle(id, 'isRunning', true);
    }

    // this.setState({ isRunning: true });

    this.timer = setInterval(() => {
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
    const { id, onTimerToggle } = this.props;
    clearInterval(this.timer);
    onTimerToggle(id, 'isRunning', false);

    // this.setState({ isRunning: false });
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
  isRunning: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  onTimerToggle: PropTypes.func.isRequired,
};

export default Timer;
