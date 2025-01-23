import { toNumbersBySep } from "lib/formatters.ts";

export function part01(input: string): number {
  return blinks(formatInput(input), 25);
}

export function part02(input: string): number {
  return 0;
}

function formatInput(input: string): number[] {
  return toNumbersBySep(" ")(input);
}

function blinks(arr: number[], times: number): number {
  for (let i = 0; i < times; i++) {
    arr = arr.flatMap((num) => {
      if (num === 0) {
        return 1;
      }

      if (num.toString().length % 2 === 0) {
        const str = num.toString();
        const sep = str.length / 2;
        const first = str.slice(0, sep);
        const second = str.slice(sep);
        return [Number(first), Number(second)];
      }

      return num * 2024;
    });
  }

  return arr.length;
}
