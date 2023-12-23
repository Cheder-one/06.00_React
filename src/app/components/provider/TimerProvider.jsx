import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { TimerContext } from '../../context';
import { formatTimer } from '../../utils';

function TimerProvider({ children }) {
  const [timers, setTimers] = useState([]);

  const addTimer = useCallback((time) => {
    const timerId = setInterval(() => {
      setTimers((prevTimers) => {
        return prevTimers.map((timer) => ({
          ...timer,
          time: formatTimer({
            min: timer.time.min,
            sec: timer.time.sec - 1,
          }),
        }));
      });
    }, 1000);

    setTimers((prevTimers) => [...prevTimers, { id: timerId, time }]);
    return timerId;
  }, []);

  const removeTimer = useCallback(
    (timerId) => {
      clearInterval(timerId);
      setTimers((prevTimers) =>
        prevTimers.filter((timer) => timer.id !== timerId)
      );
    },
    [setTimers]
  );

  // useEffect(() => {
  //   return () => {
  //     timers.forEach((timer) => clearInterval(timer.id));
  //   };
  // }, [timers, addTimer, removeTimer]);

  const contextValue = useMemo(() => {
    return {
      timers,
      addTimer,
      removeTimer,
    };
  }, [timers, addTimer, removeTimer]);

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TimerProvider;
