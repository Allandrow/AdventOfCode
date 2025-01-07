export type Sample = {
  input: string;
  expected: number;
};

export type Pos = { x: number; y: number };
export type SortPredicate = (a: number, b: number) => boolean;
export type Grid = string[][];
