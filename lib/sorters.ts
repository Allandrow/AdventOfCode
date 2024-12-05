import { SortPredicate } from "lib/types.ts";

export function sortNumbersAsc(a: number, b: number): number {
  return a - b;
}

export function bubbleSort(
  predicate: SortPredicate,
  array: number[],
): number[] {
  const arr = [...array];
  let hasChanged = false;
  do {
    hasChanged = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (predicate(arr[i], arr[i + 1])) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        hasChanged = true;
      }
    }
  } while (hasChanged);

  return arr;
}
