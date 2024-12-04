import { Pos } from "lib/types.ts";
import { onlyOddIndices } from "lib/filters.ts";

const directions: Array<Pos> = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
];

const word = "XMAS";
const validStrings = ["MMSS", "SSMM", "MSSM", "SMMS"];

export function part01(input: string): number {
  const lines = formatInput(input);
  let sum = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "X") {
        sum += getValidStringsCount({ x, y }, lines);
      }
    }
  }

  return sum;
}

function getValidStringsCount(start: Pos, lines: string[]): number {
  return directions.reduce((count, { x, y }) => {
    for (let i = 1; i < 4; i++) {
      const nextPos = { x: start.x + x * i, y: start.y + y * i };

      if (!isValidNextChar(nextPos, lines, word[i])) {
        return count;
      }
    }

    return count + 1;
  }, 0);
}

export function part02(input: string): number {
  const lines = formatInput(input);
  const limit = getLimit(lines);
  let sum = 0;

  for (let y = 0; y <= limit.y; y++) {
    for (let x = 0; x <= limit.x; x++) {
      if (lines[y][x] === "A" && validX({ x, y }, limit, lines)) {
        sum++;
      }
    }
  }

  return sum;
}

function formatInput(input: string): string[] {
  return input.split("\n");
}

function isValidNextPos(nextPos: Pos, limit: Pos): boolean {
  if (nextPos.x > limit.x || nextPos.x < 0) {
    return false;
  }

  if (nextPos.y > limit.y || nextPos.y < 0) {
    return false;
  }

  return true;
}

function isValidNextChar(
  nextPos: Pos,
  lines: string[],
  expectedChar: string,
): boolean {
  const limit = getLimit(lines);

  if (!isValidNextPos(nextPos, limit)) {
    return false;
  }

  return getChar(nextPos, lines) === expectedChar;
}

function getChar(pos: Pos, lines: string[]): string {
  return lines[pos.y][pos.x];
}

function getLimit(lines: string[]): Pos {
  return { x: lines[0].length - 1, y: lines.length - 1 };
}

function validX(pos: Pos, limit: Pos, lines: string[]): boolean {
  const string = directions
    .filter(onlyOddIndices)
    .map(({ x, y }) => {
      const nextPos = { x: x + pos.x, y: y + pos.y };

      if (!isValidNextPos(nextPos, limit)) {
        return "";
      }

      return getChar(nextPos, lines);
    }).join("");

  return validStrings.some((str) => str === string);
}
