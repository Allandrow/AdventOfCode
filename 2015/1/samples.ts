type Sample = {
  input: string;
  expected: number;
};

export const samples01: Array<Sample> = [
  { input: "(())", expected: 0 },
  { input: "()()", expected: 0 },
  { input: "(((", expected: 3 },
  { input: "(()(()(", expected: 3 },
  { input: "))(((((", expected: 3 },
  { input: "())", expected: -1 },
  { input: "))(", expected: -1 },
  { input: ")))", expected: -3 },
  { input: ")())())", expected: -3 },
];

export const samples02: Array<Sample> = [
  { input: ")", expected: 1 },
  { input: "()())", expected: 5 },
];
