export function part01(input: string): number {
  const lines = formatInput(input);

  return lines.reduce((sum, [result, nums]) => {
    const initial = nums[0];
    const remaining = nums.slice(1);

    const isSum = recursiveCompute(result, initial, remaining);

    if (isSum) {
      return sum + result;
    }

    return sum;
  }, 0);
}

export function part02(input: string): number {
  const lines = formatInput(input);

  return lines.reduce((sum, [result, nums]) => {
    const initial = nums[0];
    const remaining = nums.slice(1);

    const isSum = recursiveNewCompute(result, initial, remaining);

    if (isSum) {
      return sum + result;
    }

    return sum;
  }, 0);
}

function formatInput(input: string): [number, number[]][] {
  const lines = input.split("\n");

  return lines.map((line) => {
    const [sum, values] = line.split(":");

    return [parseInt(sum), values.trim().split(" ").map(Number)];
  });
}

function recursiveCompute(
  expected: number,
  sum: number,
  numbers: number[],
): boolean {
  if (numbers.length === 0) {
    return sum === expected;
  }

  const nextNum = numbers[0];
  const remaining = numbers.slice(1);

  return recursiveCompute(expected, sum + nextNum, remaining) ||
    recursiveCompute(expected, sum * nextNum, remaining);
}

function recursiveNewCompute(
  expected: number,
  sum: number,
  numbers: number[],
): boolean {
  if (numbers.length === 0) {
    return sum === expected;
  }

  const nextNum = numbers[0];
  const remaining = numbers.slice(1);

  return recursiveNewCompute(expected, sum + nextNum, remaining) ||
    recursiveNewCompute(expected, sum * nextNum, remaining) ||
    recursiveNewCompute(expected, concat(sum, nextNum), remaining);
}

function concat(first: number, second: number): number {
  return Number(first.toString() + second.toString());
}
