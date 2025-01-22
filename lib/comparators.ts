import { Grid, Pos } from "lib/types.ts";

export function isInBounds(pos: Pos, grid: Grid<unknown>): boolean {
  return pos.x >= 0 && pos.y >= 0 && pos.x < grid[0].length &&
    pos.y < grid.length;
}
