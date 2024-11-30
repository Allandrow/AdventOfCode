import { Sample } from "lib/types.ts";

export const samples01: Array<Sample> = [
  { input: "R2, L3", expected: 5 },
  { input: "R2, R2, R2", expected: 2 },
  { input: "R5, L5, R5, R3", expected: 12 },
];

export const samples02: Array<Sample> = [
  { input: "R8, R4, R4, R8", expected: 4 },
];
