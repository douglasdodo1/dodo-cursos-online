export function formatDate(date: string | Date | undefined): string {
  if (date === undefined) {
    return "";
  }
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return parsedDate.toLocaleDateString("pt-BR");
}
