export function formatYearMonth(value: string, lang: string): string {
  const [year = 1970, month = 1] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' }).format(
    new Date(year, month - 1),
  );
}
