const formatTimer = (min, sec) => {
  const totalSec = Number(min) * 60 + Number(sec);

  const mm = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, '0');
  const ss = (totalSec % 60).toString().padStart(2, '0');

  return `${mm}:${ss}`;
};

formatTimer(120, 120);

export default formatTimer;
