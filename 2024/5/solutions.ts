import { bubbleSort } from "lib/sorters.ts";
import { SortPredicate } from "lib/types.ts";
import { toNumbersBySep } from "lib/formatters.ts";

type ExclusionMap = Map<number, Set<number>>;

export function part01(input: string): number {
  const [map, lines] = formatInput(input);

  return lines.reduce((sum, line) => {
    if (!isValidLine(line, map)) {
      return sum;
    }

    return sum + line[Math.floor(line.length / 2)];
  }, 0);
}

export function part02(input: string): number {
  const [map, lines] = formatInput(input);

  return lines.reduce((sum, line) => {
    if (isValidLine(line, map)) {
      return sum;
    }

    const predicate = buildPredicateFn(map);
    const sortedLine = bubbleSort(predicate, line);

    return sum + sortedLine[Math.floor(line.length / 2)];
  }, 0);
}

function formatInput(input: string): [ExclusionMap, number[][]] {
  const inputs = input.split("\n\n");
  const rules = inputs[0].split("\n").reduce(mapReducer, new Map());
  const lines = inputs[1].split("\n").map(toNumbersBySep(","));

  return [rules, lines];
}

function mapReducer(map: ExclusionMap, line: string): ExclusionMap {
  const numbers = toNumbersBySep("|")(line);

  const set = map.get(numbers[0]) ?? new Set();
  set.add(numbers[1]);
  map.set(numbers[0], set);

  return map;
}

function isValidLine(line: number[], map: ExclusionMap): boolean {
  const visited = new Set();

  return line.every((num) => {
    const list = map.get(num) ?? new Set();
    const intersect = visited.intersection(list);
    visited.add(num);

    return intersect.size === 0;
  });
}

// Curry a predicate function that has a map first then gets numbers while used in the sorting algorithm
function buildPredicateFn(
  map: ExclusionMap,
): SortPredicate {
  return function (a, b) {
    const exclusions = map.get(b) ?? new Set();

    return exclusions.has(a);
  };
}
