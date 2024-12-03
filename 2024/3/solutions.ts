export function part01(input: string): number {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  return input.matchAll(regex).reduce((sum, command) => {
    return sum + Number(command[1]) * Number(command[2]);
  }, 0);
}

export function part02(input: string): number {
  const regex = /don't\(\)|do\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
  let doOp = true;

  return input.matchAll(regex).reduce((sum, command) => {
    const [op, first, second] = command;

    if (op.startsWith("mul") && doOp) {
      return sum + Number(first) * Number(second);
    }

    doOp = op === "do()";

    return sum;
  }, 0);
}
