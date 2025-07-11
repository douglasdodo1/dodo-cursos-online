export const getDuration = (start: Date | undefined, end: Date | undefined): number | null => {
  if (start === undefined || end === undefined) {
    return null;
  }
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const duration = hours;
  return duration;
};
