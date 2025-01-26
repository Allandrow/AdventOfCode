import { Sample } from "lib/types.ts";

export const samples01: Array<Sample> = [
  {
    input: `AAAA
BBCD
BBCC
EEEC`,
    expected: 140,
  },
  {
    input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
    expected: 772,
  },
  {
    input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
    expected: 1930,
  },
];

export const samples02: Array<Sample> = [];
