import { toNumbersBySep } from "lib/formatters.ts";

type Node = {
  count: number;
  next: number[];
  incoming: number;
};

export function part01(input: string): number {
  return blinks(formatInput(input), 25);
}

export function part02(input: string): number {
  const graph = formatInput2(input);

  for (let i = 0; i < 75; i++) {
    Object.entries(graph).forEach(([key, node]) => {
      const num = Number(key);

      if (node.next.length === 0) {
        node.next = setNextNums(num);
      }

      node.next.forEach((nextNum) => {
        if (!graph[nextNum]) {
          graph[nextNum] = {
            count: 0,
            next: [],
            incoming: node.count,
          };
        } else {
          graph[nextNum].incoming += node.count;
        }
      });

      node.count = 0;
    });

    Object.values(graph).forEach((node) => {
      node.count = node.incoming;
      node.incoming = 0;
    });
  }

  return Object.values(graph).reduce((sum, { count }) => sum + count, 0);
}

function formatInput(input: string): number[] {
  return toNumbersBySep(" ")(input);
}

function blinks(arr: number[], times: number): number {
  for (let i = 0; i < times; i++) {
    arr = arr.flatMap(setNextNums);
  }

  return arr.length;
}

function formatInput2(input: string): Record<number, Node> {
  const arr = formatInput(input);

  const output: Record<number, Node> = {};
  arr.forEach((num) => {
    output[num] = {
      count: 1,
      next: [],
      incoming: 0,
    };
  });

  return output;
}

function setNextNums(num: number): number[] {
  if (num === 0) {
    return [1];
  }

  if (num.toString().length % 2 === 0) {
    const str = num.toString();
    const sep = str.length / 2;
    const first = str.slice(0, sep);
    const second = str.slice(sep);

    return [Number(first), Number(second)];
  }

  return [num * 2024];
}
