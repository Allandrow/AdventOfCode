import { Pos } from "lib/types.ts";

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
      const char = lines[y][x];

      if (char === "A") {
        sum += validX({ x, y }, limit, lines);
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

function validX(pos: Pos, limit: Pos, lines: string[]): number {
  const nw = { x: -1, y: 1 };
  const ne = { x: 1, y: 1 };
  const se = { x: 1, y: -1 };
  const sw = { x: -1, y: -1 };

  const nextPositions = [nw, ne, se, sw].map(({ x, y }) => {
    return { x: x + pos.x, y: y + pos.y };
  });

  if (!nextPositions.every((d) => isValidNextPos(d, limit))) {
    return 0;
  }

  const nwChar = getChar(nextPositions[0], lines);
  const neChar = getChar(nextPositions[1], lines);
  const seChar = getChar(nextPositions[2], lines);
  const swChar = getChar(nextPositions[3], lines);

  if (nwChar === "M" && seChar === "S" && neChar === "M" && swChar === "S") {
    return 1;
  }

  if (nwChar === "S" && seChar === "M" && neChar === "M" && swChar === "S") {
    return 1;
  }

  if (nwChar === "M" && seChar === "S" && neChar === "S" && swChar === "M") {
    return 1;
  }

  if (nwChar === "S" && seChar === "M" && neChar === "S" && swChar === "M") {
    return 1;
  }

  return 0;
}
