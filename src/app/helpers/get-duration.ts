export const getDuration = (start: Date, end: Date): number => {
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const duration = hours;
  return duration;
};
