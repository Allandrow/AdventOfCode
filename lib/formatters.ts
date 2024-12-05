/**
 * Splits a string of numbers separated by whitespace to an array of numbers
 */
export function toNumbers(str: string): number[] {
  return str.split(/\s+/).map(Number);
}

/**
 * Curried function to split a line by a specified separator
 * then convert splits to numbers
 */
export function toNumbersBySep(sep: string): (str: string) => number[] {
  return (str) => str.split(sep).map(Number);
}
