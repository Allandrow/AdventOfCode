const map = {
  "(": 1,
  ")": -1,
};

type Input = Array<"(" | ")">;

export function part01(input: string): number {
  return (input.split("") as Input).reduce((acc, cur) => acc + map[cur], 0);
}

export function part02(input: string): number {
  const arr = input.split("") as Input;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += map[arr[i]];

    if (sum < 0) {
      return i + 1;
    }
  }

  return 0;
}
