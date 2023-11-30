import generateId from './generateId';

const generateTodo = () => {
  return [1, 2, 3].map((i) => ({
    id: generateId(),
    value: `Новая задача ${i}`,
    completed: Boolean(i % 2),
    created: new Date().toISOString(),
  }));
};

export default generateTodo;
