const formatTimer = ({ min = 0, sec = 0 }) => {
  const totalSec = Number(min) * 60 + Number(sec);

  const mm = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, '0');
  const ss = (totalSec % 60).toString().padStart(2, '0');

  return { min: mm, sec: ss };
};

export default formatTimer;
