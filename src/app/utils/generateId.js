import { customAlphabet } from 'nanoid';

const generateId = () => {
  const nanoid = customAlphabet('1234567890abcdef', 10);
  const id = nanoid();
  return id;
};

export default generateId;
