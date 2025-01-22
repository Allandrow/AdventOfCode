import { toNumbersBySep } from "lib/formatters.ts";
import { Grid, Pos } from "lib/types.ts";
import { isInBounds } from "lib/comparators.ts";

const directions: Array<Pos> = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

export function part01(input: string): number {
  const grid = formatInput(input);

  return setStarts(grid)
    .reduce((sum, start) => sum + getTails(start, grid), 0);
}

export function part02(input: string): number {
  const grid = formatInput(input);

  return setStarts(grid).reduce(
    (sum, start) => sum + breadthArrSearch(1, [start], grid),
    0,
  );
}

function formatInput(input: string): Grid<number> {
  return input.split("\n").map(toNumbersBySep(""));
}

function setStarts(grid: Grid<number>): Pos[] {
  const arr: Pos[] = [];

  grid.forEach((line, y) => {
    line.forEach((num, x) => {
      if (num === 0) {
        arr.push({ x, y });
      }
    });
  });

  return arr;
}

function getTails(start: Pos, grid: Grid<number>): number {
  const set: Set<string> = new Set();
  set.add(`${start.x}|${start.y}`);

  return breadthSetSearch(1, set, grid);
}

function breadthSetSearch(
  nextNum: number,
  set: Set<string>,
  grid: Grid<number>,
): number {
  if (nextNum > 9) {
    return set.size;
  }

  const newSet: Set<string> = new Set();

  set.forEach((hash) => {
    const pos = posFromHash(hash);

    directions.forEach((dir) => {
      const nextPos = {
        x: pos.x + dir.x,
        y: pos.y + dir.y,
      };

      if (isInBounds(nextPos, grid) && grid[nextPos.y][nextPos.x] === nextNum) {
        newSet.add(`${nextPos.x}|${nextPos.y}`);
      }
    });
  });

  return breadthSetSearch(++nextNum, newSet, grid);
}

function breadthArrSearch(
  nextNum: number,
  arr: Pos[],
  grid: Grid<number>,
): number {
  if (nextNum > 9) {
    return arr.length;
  }

  const newArr: Pos[] = [];

  arr.forEach((pos) => {
    directions.forEach((dir) => {
      const next = {
        x: pos.x + dir.x,
        y: pos.y + dir.y,
      };

      if (isInBounds(next, grid) && grid[next.y][next.x] === nextNum) {
        newArr.push(next);
      }
    });
  });

  return breadthArrSearch(++nextNum, newArr, grid);
}

function posFromHash(hash: string): Pos {
  const split = hash.split("|");
  return { x: Number(split[0]), y: Number(split[1]) };
}
