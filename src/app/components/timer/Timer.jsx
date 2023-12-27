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
    const [isFirstRender, setIsFirstRender] = useState(true);

    const timeRef = useRef(time);
    const timerIdRef = useRef(null);

    useEffect(() => {
      timeRef.current = time;
    }, [time]);

    const updateTimer = () => {
      setTime((prevTime) => {
        const { min, sec } = prevTime;
        return formatTimer({ min, sec: sec - 1 });
      });
    };

    const startTimer = (hasCheck = true) => {
      if (hasCheck) {
        if (isRunning || isBlocked || isCompleted) return;
        onTimerToggle(id, 'isRunning', true);
      }

      timerIdRef.current = setInterval(() => {
        updateTimer();
      }, 1000);
    };

    const clearTimer = () => {
      clearInterval(timerIdRef.current);
    };

    const pauseTimer = () => {
      clearTimer();
      onTimerToggle(id, 'isRunning', false);
    };

    useEffect(() => {
      if (!isRunning || isBlocked) {
        pauseTimer();
      }
    }, [isRunning, isBlocked]);

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
      saveLocalStorage(`timerValue_${id}`, timeRef.current);
      saveLocalStorage(`timestamp_${id}`, Date.now());
    };

    // useMount/Unmount
    useEffect(() => {
      setIsFirstRender(false);
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

      if (totalTime <= 0 && !isBlocked) {
        pauseTimer();
        onTimerToggle(id, 'isBlocked', true);
        setTime({ min: '00', sec: '00' });
      }
    }, [time]);

    // useTimerUpdate
    useEffect(() => {
      if (isFirstRender) return;

      setTime(timerValue);
      onTimerToggle(id, 'isRunning', false);
      onTimerToggle(id, 'isBlocked', false);

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

// TODO Исправить отрицательный таймер при нулевом создании времени TODO
// TODO Исправить оставшиеся значения при отмене Edit TODO

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
//   this.onTimerToggle(id, 'isBlocked', true);
//   this.setTime({ time: { min: '00', sec: '00' } });
// }
// }
// handleTimerUpdate(pvp) {
//   const { id, timerValue, isCompleted } = this.props;
//   if (pvp.timerValue !== timerValue) {
//     this.setTime({ time: timerValue });
//     this.onTimerToggle(id, 'isRunning', false);
//     this.onTimerToggle(id, 'isBlocked', false);
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
// onTimerToggle = (itemId, fieldName, status) => {
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
//     this.onTimerToggle(id, 'isRunning', true);
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
//   this.onTimerToggle(id, 'isRunning', false);
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
