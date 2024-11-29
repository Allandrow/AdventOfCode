export function part01(input: string): number {
  return input.split("\n").reduce((total, line) => {
    const [l, w, h] = line.split("x").map(Number);

    const lw = l * w;
    const wh = w * h;
    const lh = l * h;

    const min = Math.min(lw, wh, lh);

    return total + 2 * lw + 2 * wh + 2 * lh + min;
  }, 0);
}

export function part02(input: string): number {
  return input.split("\n").reduce((total, line) => {
    const [a, b, c] = line.split("x").map(Number).sort((a, b) => a - b);
    return total + 2 * a + 2 * b + a * b * c;
  }, 0);
}
