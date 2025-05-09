export function isValidDateFormat(dateStr: string): boolean {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!regex.test(dateStr)) {
    return false;
  }

  // Verifica que sea una fecha válida del calendario
  const date = new Date(dateStr);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString().startsWith(dateStr)
  );
}
