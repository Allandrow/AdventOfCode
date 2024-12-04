type Pos = { x: number; y: number };

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

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const char = lines[i][j];

      if (char === "X") {
        const strings = setDirectionStrings({ x: j, y: i }, lines);
        sum += strings.filter((str) => str === word).length;
      }
    }
  }

  return sum;
}

export function part02(input: string): number {
  const lines = formatInput(input);
  const limit = { x: lines[0].length - 1, y: lines.length - 1 };
  let sum = 0;

  for (let i = 0; i <= limit.y; i++) {
    for (let j = 0; j <= limit.x; j++) {
      const char = lines[i][j];

      if (char === "A") {
        sum += validX({ x: j, y: i }, limit, lines);
      }
    }
  }

  return sum;
}

function formatInput(input: string): string[] {
  return input.split("\n");
}

function setDirectionStrings(pos: Pos, lines: string[]): string[] {
  const limit = { x: lines[0].length - 1, y: lines.length - 1 };
  return directions.map((direction) => {
    for (let i = 1; i <= 3; i++) {
      const nextPos = {
        x: pos.x + direction.x * i,
        y: pos.y + direction.y * i,
      };

      if (
        !(isValidNextPos(nextPos, limit) &&
          lines[nextPos.y][nextPos.x] === word[i])
      ) {
        return "";
      }
    }
    return "XMAS";
  });
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

  const nwChar = getValue(nextPositions[0], lines);
  const neChar = getValue(nextPositions[1], lines);
  const seChar = getValue(nextPositions[2], lines);
  const swChar = getValue(nextPositions[3], lines);

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

function getValue(pos: Pos, lines: string[]): string {
  return lines[pos.y][pos.x];
}
