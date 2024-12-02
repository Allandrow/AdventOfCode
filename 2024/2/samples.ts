import { Sample } from "lib/types.ts";

export const samples01: Array<Sample> = [
  {
    input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
    expected: 2,
  },
];

export const samples02: Array<Sample> = [
  {
    input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
    expected: 4,
  },
  { input: "1 2 3 7 5", expected: 1 },
  { input: "4 2 3 4 5", expected: 1 },
  { input: "1 2 3 4 8", expected: 1 },
  { input: "9 2 3 4 7", expected: 1 },
  { input: "11 14 13 12", expected: 1 },
  { input: "10 8 9 10 11", expected: 1 },
  { input: "11 14 13 15", expected: 1 },
  { input: "7 3 5 9", expected: 0 },
  { input: "1 4 2 2 5", expected: 0 },
  { input: "1 1 5 2", expected: 0 },
  { input: "1 3 1 3", expected: 0 },
  { input: "31 28 27 30 31", expected: 0 },
];
