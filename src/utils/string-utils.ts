export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function pluralize(value: string, count: number): string {
  if (count === 1) {
    return value;
  }
  return `${value}s`;
}

export function pluralizeAndCombine(value: string, count: number): string {
  return `${count} ${pluralize(value, count)}`;
}
