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
import { useFirstRender } from '../../hooks';

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

    const timeRef = useRef(time);
    const timerIdRef = useRef(null);
    const isFirstRender = useFirstRender();

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
      if (isFirstRender) return;

      if (!isRunning || isBlocked) {
        pauseTimer();
      }
      if (isRunning && !isBlocked && !isCompleted) {
        clearTimer();
        startTimer(false);
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
