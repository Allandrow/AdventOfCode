import { samples01, samples02 } from "./samples.ts";
import { expect } from "@std/expect";
import { part01, part02 } from "./solutions.ts";

samples01.forEach(({ input, expected }) => {
  Deno.test(`part 1: ${input} gives ${expected}`, () => {
    expect(part01(input)).toBe(expected);
  });
});

// samples02.forEach(({ input, expected }) => {
//   Deno.test(`part 2: ${input} gives ${expected}`, () => {
//     expect(part02(input)).toBe(expected);
//   });
// });
