import { Sample } from "lib/types.ts";

export const samples01: Array<Sample> = [
  { input: ">", expected: 2 },
  { input: "^>v<", expected: 4 },
  { input: "^v^v^v^v^v", expected: 2 },
];

export const samples02: Array<Sample> = [
  { input: "^v", expected: 3 },
  { input: "^>v<", expected: 3 },
  { input: "^v^v^v^v^v", expected: 11 },
];
