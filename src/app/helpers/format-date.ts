export const formatDate = (date: Date | undefined): string => {
  if (date === undefined) return "";
  return date.toLocaleDateString("pt-BR");
};
