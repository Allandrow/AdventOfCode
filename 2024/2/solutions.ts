export function part01(input: string): number {
  const lines = input.split("\n").map((line) => line.split(" ").map(Number));

  let count = 0;

  lines.forEach((line) => {
    const order = line[0] < line[line.length - 1] ? "asc" : "desc";

    const isSafe = line.every((num, i) => {
      if (i === 0) {
        return true;
      }

      const prevNum = line[i - 1];
      const diff = Math.abs(num - prevNum);

      return (order === "asc" ? num > prevNum : num < prevNum) &&
        (1 <= diff && diff <= 3);
    });

    if (isSafe) {
      count++;
    }
  });

  return count;
}

export function part02(input: string): number {
  const lines = input.split("\n").map((line) => line.split(" ").map(Number));

  return lines.reduce((sum, line) => sum + recurseMyBalls(line, 0), 0);
}

function isWithinRange(current: number, previous: number): boolean {
  const diff = Math.abs(current - previous);
  return 1 <= diff && diff <= 3;
}

function recurseMyBalls(array: number[], iterationCount: number): number {
  if (iterationCount > 1) {
    return 0;
  }

  const orders = new Set();

  for (let i = 1; i < array.length; i++) {
    const num = array[i];
    const prev = array[i - 1];

    if (!orders.has("asc") && num > prev) {
      orders.add("asc");
    }

    if (!orders.has("desc") && num < prev) {
      orders.add("desc");
    }

    if (!isWithinRange(num, prev) || orders.size === 2) {
      const withoutPrevPrev = array.filter((_, index) => index !== i - 2);
      const withoutNum = array.filter((_, index) => index !== i);
      const withoutPrev = array.filter((_, index) => index !== i - 1);

      return recurseMyBalls(withoutPrev, iterationCount + 1) ||
        recurseMyBalls(withoutPrevPrev, iterationCount + 1) ||
        recurseMyBalls(withoutNum, iterationCount + 1);
    }
  }

  return 1;
}
