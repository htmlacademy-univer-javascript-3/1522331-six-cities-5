export function formatDate(dateString: Date): string {
  const monthsInEnglish = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);
  const month = monthsInEnglish[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}
