import { formatDistanceToNow } from 'date-fns';

const getDuration = (created) => {
  return formatDistanceToNow(new Date(created), {
    includeSeconds: true,
  });
};

export default getDuration;
