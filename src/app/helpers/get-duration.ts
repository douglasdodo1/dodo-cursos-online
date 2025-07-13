export const getDuration = (start: Date | string, end: Date | string): number | null => {
  if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return hours;
};
