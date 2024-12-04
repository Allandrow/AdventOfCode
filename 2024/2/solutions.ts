import { toNumbers } from "lib/formatters.ts";

export function part01(input: string): number {
  return formatInput(input).reduce((sum, line) => {
    return isSafe(line) ? ++sum : sum;
  }, 0);
}

export function part02(input: string): number {
  return formatInput(input).reduce((sum, line) => {
    return hasOneSafeLine(line) ? sum + 1 : sum;
  }, 0);
}

function formatInput(input: string): number[][] {
  return input.split("\n").map(toNumbers);
}

function hasOneSafeLine(line: number[]): boolean {
  return getSubarrays(line).some(isSafe);
}

function getSubarrays(line: number[]): number[][] {
  const subs = [];

  for (let i = 0; i < line.length; i++) {
    subs.push(line.filter((_, index) => index !== i));
  }

  return subs;
}

function isSafe(line: number[]): boolean {
  const ordering = new Set();

  for (let i = 1; i < line.length; i++) {
    const num = line[i];
    const prev = line[i - 1];

    ordering.add(num < prev ? "desc" : "asc");

    if (!isWithinRange(num, prev) || ordering.size === 2) {
      return false;
    }
  }

  return true;
}

function isWithinRange(current: number, previous: number): boolean {
  const diff = Math.abs(current - previous);

  return 1 <= diff && diff <= 3;
}
