import { Grid, Pos } from "lib/types.ts";
import { isInBounds } from "lib/comparators.ts";

type Antennas = Map<string, Pos[]>;

export function part01(input: string): number {
  const grid = formatInput(input);
  const antennas = getAntennas(grid);

  const solutions = new Set<string>();

  antennas.forEach((value) => {
    for (let i = 0; i < value.length - 1; i++) {
      for (let j = i + 1; j < value.length; j++) {
        const diffs = {
          x: Math.abs(value[i].x - value[j].x),
          y: Math.abs(value[i].y - value[j].y),
        };

        const [a, b] = getNextPos(value[i], value[j], diffs);

        if (isInBounds(a, grid)) {
          solutions.add(`${a.x}|${a.y}`);
        }

        if (isInBounds(b, grid)) {
          solutions.add(`${b.x}|${b.y}`);
        }
      }
    }
  });

  return solutions.size;
}

export function part02(input: string): number {
  const grid = formatInput(input);
  const antennas = getAntennas(grid);

  const solutions = new Set<string>();

  antennas.forEach((antenna) => {
    for (let i = 0; i < antenna.length - 1; i++) {
      addPos(antenna[i], solutions);
      for (let j = i + 1; j < antenna.length; j++) {
        addPos(antenna[j], solutions);

        let times = 1;

        let a = antenna[i];
        let b = antenna[j];

        while (isInBounds(a, grid) || isInBounds(b, grid)) {
          const diffs = {
            x: Math.abs(antenna[i].x - antenna[j].x) * times,
            y: Math.abs(antenna[i].y - antenna[j].y) * times,
          };
          const newPos = getNextPos(antenna[i], antenna[j], diffs);
          a = newPos[0];
          b = newPos[1];

          if (isInBounds(a, grid)) {
            addPos(a, solutions);
          }

          if (isInBounds(b, grid)) {
            addPos(b, solutions);
          }

          times++;
        }
      }
    }
  });

  return solutions.size;
}

function addPos(pos: Pos, set: Set<string>) {
  set.add(`${pos.x}|${pos.y}`);
}

function getAntennas(grid: Grid<string>): Antennas {
  const map = new Map();

  grid.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell !== ".") {
        const coords = map.get(cell) ?? [];
        coords.push({ x: Number(x), y: Number(y) });
        map.set(cell, coords);
      }
    });
  });

  return map;
}

function formatInput(input: string): Grid<string> {
  return input.split("\n").map((line) => line.split(""));
}

function getNextPos(a: Pos, b: Pos, diff: Pos): [Pos, Pos] {
  const posA = { x: 0, y: 0 };
  const posB = { x: 0, y: 0 };

  if (a.x < b.x) {
    posA.x = a.x - diff.x;
    posB.x = b.x + diff.x;
  } else {
    posA.x = a.x + diff.x;
    posB.x = b.x - diff.x;
  }

  if (a.y < b.y) {
    posA.y = a.y - diff.y;
    posB.y = b.y + diff.y;
  } else {
    posA.y = a.y + diff.y;
    posB.y = b.y - diff.y;
  }

  return [posA, posB];
}
