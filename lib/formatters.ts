/**
 * Splits a string of numbers separated by whitespace to an array of numbers
 * @param {string} str
 * @returns {number[]}
 */
export function toNumbers(str: string): number[] {
  return str.split(/\s+/).map(Number);
}
