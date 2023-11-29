import { formatDistanceToNow } from "date-fns";

export const getDuration = (created) => {
  return formatDistanceToNow(new Date(created), {
    includeSeconds: true
  });
};
