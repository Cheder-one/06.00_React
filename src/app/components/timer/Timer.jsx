import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  formatTimer,
  getLocalStorage,
  saveLocalStorage,
} from '../../utils';

function Timer({
  id,
  timerValue,
  isRunning,
  isBlocked,
  isCompleted,
  onTimerToggle,
}) {
  const [time, setTime] = useState(timerValue);

  const updateTimer = () => {
    setTime((prevTime) => {
      const { min, sec } = prevTime;
      return formatTimer({ min, sec: sec - 1 });
    });
  };

  const startTimer = (isSkip) => {
    if (!isSkip) {
      if (isRunning || isBlocked) return;
      onTimerToggle(id, 'isRunning', true);
    }

    const timer = setInterval(() => {
      updateTimer();
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(timer);
    };
  };

  const clearTimer = startTimer();

  const pauseTimer = () => {
    clearTimer();
    onTimerToggle(id, 'isRunning', false);
  };

  const handlePrevTimerTime = ({ min, sec }) => {
    if (isRunning) {
      const stamp = getLocalStorage(`timestamp_${id}`);
      const diff = Date.now() - stamp;
      const secDiff = Math.floor(diff / 1000);
      const value = formatTimer({ min, sec: sec - secDiff });

      setTime(value);
    } else {
      setTime(formatTimer({ min, sec }));
    }
  };

  const handleUnmount = () => {
    clearTimer();

    saveLocalStorage(`timerValue_${id}`, time);
    saveLocalStorage(`timestamp_${id}`, Date.now());
  };

  useEffect(() => {
    const prevTimerTime = getLocalStorage(`timerValue_${id}`);
    if (prevTimerTime) {
      handlePrevTimerTime(prevTimerTime);
    }

    if (isRunning) {
      startTimer('skip');
    } else {
      pauseTimer();
    }

    return () => {
      handleUnmount();
    };
  }, []);

  useEffect(() => {
    const { min, sec } = time;
    const totalTime = Number(min) + Number(sec);

    if (totalTime <= 0) {
      pauseTimer();

      onTimerToggle(id, 'isBlocked', true);
      setTime({ min: '00', sec: '00' });
    }
  }, [time]);

  useEffect(() => {
    setTime(timerValue);
    onTimerToggle(id, 'isRunning', false);
    onTimerToggle(id, 'isBlocked', false);

    clearTimer();
    if (!isCompleted) {
      startTimer();
    }
  }, [timerValue]);

  useEffect(() => {
    if (!isCompleted) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [isCompleted]);

  const { min, sec } = time;

  return <span className="todo-timer">{`${min}:${sec}`}</span>;
}

// class Timer extends Component {
//   constructor(props) {
//     super(props);

//     state = {
//       time: props.timerValue,
//     };
//   }

// componentDidMount() {
//   const prevTimerTime = getLocalStorage(`timerValue_${id}`);

//   if (prevTimerTime) {
//     const { min, sec } = prevTimerTime;

//     if (isRunning) {
//       const stamp = getLocalStorage(`timestamp_${id}`);
//       const diff = Date.now() - stamp;
//       const secDiff = Math.floor(diff / 1000);
//       const value = formatTimer({ min, sec: sec - secDiff });

//       setTime({ time: value });
//     } else {
//       setTime({ time: formatTimer({ min, sec }) });
//     }
//   }

//   if (isRunning) {
//     startTimer('skip');
//   } else {
//     pauseTimer();
//   }
// }

// componentDidUpdate(pvp, pvs) {
//   handleTimeExpiry(pvs);
//   handleTimerUpdate(pvp);
//   handleTodoComplete(pvp, pvs);
// }

// componentWillUnmount() {

//   clearInterval(timer);
//   saveLocalStorage(`timerValue_${id}`, time);
//   saveLocalStorage(`timestamp_${id}`, Date.now());
// }

// handleTimeExpiry(pvs) {
//   // prettier-ignore
//   const prevMin = pvs.time.min;
//   const prevSec = pvs.time.sec;

//   const totalTime = Number(min) + Number(sec);
//   const prevTotalTime = Number(prevMin) + Number(prevSec);

//   if (totalTime <= 0 && totalTime !== prevTotalTime) {
//     pauseTimer();

//     onTimerToggle(id, 'isBlocked', true);
//     setTime({ time: { min: '00', sec: '00' } });
//   }
// }

// handleTimerUpdate(pvp) {

//   if (pvp.timerValue !== timerValue) {
//     setTime({ time: timerValue });
//     onTimerToggle(id, 'isRunning', false);
//     onTimerToggle(id, 'isBlocked', false);

//     clearInterval(timer);
//     if (!isCompleted) {
//       startTimer();
//     }
//   }
// }

// handleTodoComplete = (pvp) => {
//   const wasCompleted = pvp.isCompleted;

//   if (isCompleted && !wasCompleted) {
//     pauseTimer();
//   }
//   if (!isCompleted && wasCompleted) {
//     startTimer();
//   }
// };

// startTimer = (isSkip) => {

//   if (!isSkip) {
//     if (isRunning || isBlocked) return;
//     onTimerToggle(id, 'isRunning', true);
//   }

//   timer = setInterval(() => {
//     updateTimer();
//   }, 1000);
// };

// updateTimer = () => {
//   setTime(({ time }) => {
//     const { min, sec } = time;
//     return { time: formatTimer({ min, sec: sec - 1 }) };
//   });
// };

// pauseTimer = () => {
//   clearInterval(timer);
//   onTimerToggle(id, 'isRunning', false);
// };

//   render() {
//     const { min, sec } = time;

//     return <span className="todo-timer">{`${min}:${sec}`}</span>;
//   }
// }

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
