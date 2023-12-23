import formatTimer from './formatTimer';
import generateId from './generateId';

const generateTime = () => {
  const min = (Math.random() * 10).toFixed(0);
  const sec = (Math.random() * 100).toFixed(0);

  return formatTimer({ min, sec });
};

const generateTodo = () => {
  return [1, 2, 3].map((i) => ({
    id: generateId(),
    value: `Новая задача ${i}`,
    timerValue: generateTime(),
    isRunning: false,
    isBlocked: false,
    isCompleted: Boolean(i % 2),
    created: new Date().toISOString(),
  }));
};

export default generateTodo;
