import { Grid, Pos } from "lib/types.ts";
import { isInBounds } from "lib/comparators.ts";

type Obs = Set<string>;

// North - East - South - West
const directions: Array<Pos> = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

export function part01(input: string): number {
  const grid = formatInput(input);
  const { start, obstacles } = registerPositions(grid);
  let directionIndex = 0;
  let currentPos = start;
  const visited = new Set();

  while (isInBounds(currentPos, grid)) {
    const posDirection = directions[directionIndex];

    visited.add(`${currentPos.x}|${currentPos.y}`);

    const nextPos = {
      x: currentPos.x + posDirection.x,
      y: currentPos.y + posDirection.y,
    };

    if (isAnObstacle(nextPos, obstacles)) {
      directionIndex = (directionIndex + 1) % directions.length;
      continue;
    }

    currentPos = nextPos;
  }

  return visited.size;
}

export function part02(input: string): number {
  const grid = formatInput(input);
  const { start, obstacles } = registerPositions(grid);
  let index = 0;
  let currentPos = start;
  const solutions = new Set<string>();

  const visited = new Set<string>();

  // check the potential obstacle positions
  while (isInBounds(currentPos, grid)) {
    const posDirection = directions[index];

    visited.add(`${currentPos.x}|${currentPos.y}`);

    const nextPos = {
      x: currentPos.x + posDirection.x,
      y: currentPos.y + posDirection.y,
    };

    if (isAnObstacle(nextPos, obstacles)) {
      index = updateIndex(index);
      continue;
    }

    currentPos = nextPos;
  }

  visited.delete(`${start.x}|${start.y}`);

  // replace each visited position one by one and see if it loops or not
  visited.forEach((hash) => {
    currentPos = start;
    index = 0;
    obstacles.add(hash);
    const set = new Set<string>();

    while (isInBounds(currentPos, grid)) {
      const step = directions[index];
      const posHash = `${index}|${currentPos.x}|${currentPos.y}`;

      if (set.has(posHash)) {
        solutions.add(hash);
        break;
      }

      set.add(posHash);

      const nextPos = {
        x: currentPos.x + step.x,
        y: currentPos.y + step.y,
      };

      if (isAnObstacle(nextPos, obstacles)) {
        index = updateIndex(index);
        continue;
      }

      currentPos = nextPos;
    }

    obstacles.delete(hash);
  });

  return solutions.size;
}

function formatInput(input: string): Grid {
  return input.split("\n").map((line) => line.split(""));
}

function registerPositions(grid: Grid): { start: Pos; obstacles: Obs } {
  const set: Set<string> = new Set();
  const start: Pos = { x: 0, y: 0 };

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const char = grid[y][x];

      if (char === "#") {
        set.add(`${x}|${y}`);
        continue;
      }

      if (char !== ".") {
        start.x = x;
        start.y = y;
      }
    }
  }

  return {
    start,
    obstacles: set,
  };
}

function isAnObstacle(pos: Pos, set: Obs): boolean {
  return set.has(`${pos.x}|${pos.y}`);
}

function updateIndex(index: number): number {
  return (index + 1) % directions.length;
}

function isStart(start: Pos, pos: Pos): boolean {
  return start.x === pos.x && start.y === pos.y;
}
