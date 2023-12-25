import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  formatTimer,
  getLocalStorage,
  saveLocalStorage,
} from '../../utils';

const Timer = forwardRef(
  (
    {
      id,
      timerValue,
      isRunning,
      isBlocked,
      isCompleted,
      onTimerToggle,
    },
    ref
  ) => {
    const [time, setTime] = useState(timerValue);
    const timerRef = useRef();

    const handleTimerToggle = (itemId, fieldName, status) => {
      const toggleTimer = (prevTodos) => {
        const toggled = prevTodos.map((todo) =>
          // prettier-ignore
          todo.id === itemId
          ? { ...todo, [fieldName]: status }
          : todo
        );

        return toggled;
      };
      onTimerToggle(toggleTimer);
    };

    const updateTimer = () => {
      setTime((prevTime) => {
        const { min, sec } = prevTime;
        return formatTimer({ min, sec: sec - 1 });
      });
    };

    const startTimer = (hasCheck = true) => {
      if (hasCheck) {
        if (isRunning || isBlocked || isCompleted) return;
        handleTimerToggle(id, 'isRunning', true);
      }

      const timer = setInterval(() => {
        updateTimer();
      }, 1000);

      // eslint-disable-next-line
      return () => clearInterval(timer);
    };

    useEffect(() => {
      timerRef.current = startTimer(false);
      return timerRef.current;
    }, []);

    const clearTimer = () => {
      timerRef.current();
    };

    const pauseTimer = () => {
      clearTimer();
      handleTimerToggle(id, 'isRunning', false);
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
        startTimer(false);
      } else {
        pauseTimer();
      }

      return handleUnmount;
    }, []);

    // useTimeExpiry
    useEffect(() => {
      const { min, sec } = time;
      const totalTime = Number(min) + Number(sec);

      if (totalTime <= 0) {
        pauseTimer();
        handleTimerToggle(id, 'isBlocked', true);
        setTime({ min: '00', sec: '00' });
      }
    }, [time]);

    // useTimerUpdate
    useEffect(() => {
      setTime(timerValue);
      handleTimerToggle(id, 'isRunning', false);
      handleTimerToggle(id, 'isBlocked', false);

      clearTimer();
      if (!isCompleted) startTimer();
    }, [timerValue]);

    // useTodoComplete
    useEffect(() => {
      if (!isCompleted) {
        startTimer();
      } else {
        pauseTimer();
      }
    }, [isCompleted]);

    useImperativeHandle(ref, () => ({
      startTimer,
      pauseTimer,
    }));

    const { min, sec } = time;
    return <span className="todo-timer">{`${min}:${sec}`}</span>;
  }
);

// class Timer extends Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     time: props.timerValue,
//   };
// }
// componentDidMount() {
//   const { id, isCompleted, isRunning } = this.props;
//   const prevTimerTime = getLocalStorage(`timerValue_${id}`);
//   if (prevTimerTime) {
//     const { min, sec } = prevTimerTime;
//     if (isRunning) {
//       const stamp = getLocalStorage(`timestamp_${id}`);
//       const diff = Date.now() - stamp;
//       const secDiff = Math.floor(diff / 1000);
//       const value = formatTimer({ min, sec: sec - secDiff });
//       this.setTime({ time: value });
//     } else {
//       this.setTime({ time: formatTimer({ min, sec }) });
//     }
//   }
//   if (isRunning && !isCompleted) {
//     this.startTimer('skip');
//   } else {
//     this.pauseTimer();
//   }
// }
// componentDidUpdate(pvp, pvs) {
//   this.handleTimeExpiry(pvs);
//   this.handleTimerUpdate(pvp);
//   this.handleTodoComplete(pvp, pvs);
// }
// componentWillUnmount() {
//   const { id } = this.props;
//   const { time } = this.state;
//   clearInterval(this.timer);
//   saveLocalStorage(`timerValue_${id}`, time);
//   saveLocalStorage(`timestamp_${id}`, Date.now());
// }
// handleTimeExpiry(pvs) {
// const { id } = this.props;
// // prettier-ignore
// const { time: { min, sec } } = this.state;
// const prevMin = pvs.time.min;
// const prevSec = pvs.time.sec;
// const totalTime = Number(min) + Number(sec);
// const prevTotalTime = Number(prevMin) + Number(prevSec);
// if (totalTime <= 0 && totalTime !== prevTotalTime) {
//   this.pauseTimer();
//   this.handleTimerToggle(id, 'isBlocked', true);
//   this.setTime({ time: { min: '00', sec: '00' } });
// }
// }
// handleTimerUpdate(pvp) {
//   const { id, timerValue, isCompleted } = this.props;
//   if (pvp.timerValue !== timerValue) {
//     this.setTime({ time: timerValue });
//     this.handleTimerToggle(id, 'isRunning', false);
//     this.handleTimerToggle(id, 'isBlocked', false);
//     clearInterval(this.timer);
//     if (!isCompleted) {
//       this.startTimer();
//     }
//   }
// }
// handleTodoComplete = (pvp) => {
//   const { isCompleted } = this.props;
//   const wasCompleted = pvp.isCompleted;
//   if (isCompleted && !wasCompleted) {
//     this.pauseTimer();
//   }
//   if (!isCompleted && wasCompleted) {
//     this.startTimer();
//   }
// };
// handleTimerToggle = (itemId, fieldName, status) => {
//   const { onTimerToggle } = this.props;
//   const toggleTimer = (prev) => {
//     const toggled = prev.todos.map((todo) =>
//       // prettier-ignore
//       todo.id === itemId
//         ? { ...todo, [fieldName]: status }
//         : todo
//     );
//     return { todos: toggled };
//   };
//   onTimerToggle(toggleTimer);
// };
// startTimer = (isSkip) => {
//   const { id, isRunning, isBlocked, isCompleted } = this.props;
//   if (!isSkip) {
//     if (isRunning || isBlocked || isCompleted) {
//       return;
//     }
//     this.handleTimerToggle(id, 'isRunning', true);
//   }
//   this.timer = setInterval(() => {
//     this.updateTimer();
//   }, 1000);
// };
// updateTimer = () => {
//   this.setTime(({ time }) => {
//     const { min, sec } = time;
//     return { time: formatTimer({ min, sec: sec - 1 }) };
//   });
// };
// pauseTimer = () => {
//   const { id } = this.props;
//   clearInterval(this.timer);
//   this.handleTimerToggle(id, 'isRunning', false);
// };
// render() {
//   const { time } = this.state;
//   const { min, sec } = time;
//   return <span className="todo-timer">{`${min}:${sec}`}</span>;
// }
// }

Timer.displayName = 'Timer';

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
