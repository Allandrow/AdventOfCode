import { sortNumbersAsc } from "lib/sorters.ts";

type Lists = [number[], number[]];

export function part01(input: string): number {
  const [left, right] = setLists(input);

  // sort the 2 lists from low to high
  left.sort(sortNumbersAsc);
  right.sort(sortNumbersAsc);

  // reduce the tuple by the abs sum of the comparison of each index between lists
  return left.reduce((sum, num, i) => {
    return sum + Math.abs(num - right[i]);
  }, 0);
}

export function part02(input: string): number {
  const [left, right] = setLists(input);

  // set a Map that will store each occurence count and serve as cache to avoid recounting already known numbers
  const occCount = new Map();

  for (const num of left) {
    // skip this iteration if num has already been counted
    if (occCount.has(num)) {
      continue;
    }

    const count = right.filter((value) => value === num).length;
    occCount.set(num, count);
  }

  // reduce the first list to multiply each number by his occurence count and add to sum
  return left.reduce((total, num) => {
    return total + num * occCount.get(num);
  }, 0);
}

// Set a tuple of 2 lists, one for each column with inputs converted to numbers
function setLists(input: string): Lists {
  return input.split("\n").reduce((lists: Lists, line) => {
    const [a, b] = line.split(/\s+/);

    lists[0].push(Number(a));
    lists[1].push(Number(b));

    return lists;
  }, [[], []]);
}
