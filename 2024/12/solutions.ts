import { Grid, Pos } from "lib/types.ts";
import { directions } from "lib/constants.ts";
import { isInBounds } from "lib/comparators.ts";

type Area = {
  plots: Set<string>;
  perimeter: number;
  value: string;
};

export function part01(input: string): number {
  const grid = formatInput(input);
  const areas = getAreas(grid);

  return areas.reduce(
    (sum, { perimeter, plots }) => sum + perimeter * plots.size,
    0,
  );
}

export function part02(input: string): number {
  return 0;
}

function formatInput(input: string): Grid<string> {
  return input.split("\n").map((line) => line.split(""));
}

function getAreas(grid: Grid<string>): Area[] {
  const seen: Set<string> = new Set();

  const areas: Area[] = [];

  grid.forEach((line, y) => {
    line.forEach((plot, x) => {
      if (seen.has(hash(x, y))) {
        return;
      }

      const plots = bfs(plot, grid, new Set(), [{ x, y }]);
      plots.forEach((plot) => {
        seen.add(plot);
      });

      areas.push({ plots, perimeter: setPerim(plots), value: plot });
    });
  });

  return areas;
}

function hash(x: number, y: number): string {
  return `${x}|${y}`;
}

function bfs(
  value: string,
  grid: Grid<string>,
  area: Set<string>,
  plots: Pos[],
): Set<string> {
  if (plots.length === 0) {
    return area;
  }

  const arr: Pos[] = [];
  plots.forEach((plot) => {
    area.add(hash(plot.x, plot.y));
    directions.forEach((dir) => {
      const next: Pos = {
        x: dir.x + plot.x,
        y: dir.y + plot.y,
      };

      const nextHash = hash(next.x, next.y);

      if (
        isInBounds(next, grid) && grid[next.y][next.x] === value &&
        !area.has(nextHash)
      ) {
        arr.push(next);
        area.add(nextHash);
      }
    });
  });

  return bfs(value, grid, area, arr);
}

function setPerim(plots: Set<string>): number {
  let sum = 0;

  plots.forEach((plot) => {
    const coords = plot.split("|");
    const pos = {
      x: Number(coords[0]),
      y: Number(coords[1]),
    };

    directions.forEach((dir) => {
      const next = {
        x: pos.x + dir.x,
        y: pos.y + dir.y,
      };

      if (!plots.has(hash(next.x, next.y))) {
        sum++;
      }
    });
  });

  return sum;
}
