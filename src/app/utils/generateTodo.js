import generateId from './generateId';

const generateTodo = () => {
  return [1, 2, 3].map((i) => ({
    id: generateId(),
    value: `Новая задача ${i}`,
    timer: {
      min: (Math.random() * 10).toFixed(0),
      sec: (Math.random() * 100).toFixed(0),
    },
    completed: Boolean(i % 2),
    created: new Date().toISOString(),
  }));
};

export default generateTodo;
