type ExclusionMap = Map<number, Set<number>>;

export function part01(input: string): number {
  const [rules, lines] = formatInput(input);
  const list = setExclusionMap(rules);

  let sum = 0;

  Lines: for (const line of lines) {
    const visited = new Set();

    for (const num of line) {
      const numberExclusionList = list.get(num) ?? new Set();
      const intersect = visited.intersection(numberExclusionList);
      visited.add(num);

      if (intersect.size > 0) {
        continue Lines;
      }
    }

    sum += line[Math.floor(line.length / 2)];
  }

  return sum;
}

export function part02(input: string): number {
  const [rules, lines] = formatInput(input);
  const list = setExclusionMap(rules);

  let sum = 0;

  for (const line of lines) {
    const visited = new Set();
    let intersect: Set<number> = new Set();

    for (const num of line) {
      const numberExclusionList = list.get(num) ?? new Set();
      intersect = visited.intersection(numberExclusionList);

      if (intersect.size > 0) {
        break;
      }

      visited.add(num);
    }

    if (intersect.size === 0) {
      continue;
    }
    const newLine = sortLine(line, list);
    sum += newLine[Math.floor(line.length / 2)];
  }

  return sum;
}

function formatInput(input: string): [number[][], number[][]] {
  const inputs = input.split("\n\n");

  const rules = inputs[0].split("\n").map((rule) => {
    return rule.split("|").map(Number);
  });

  const lines = inputs[1].split("\n").map((line) =>
    line.split(",").map(Number)
  );

  return [rules, lines];
}

function setExclusionMap(rules: number[][]): ExclusionMap {
  return rules.reduce((map, rule) => {
    const set = map.get(rule[0]) ?? new Set();
    set.add(rule[1]);
    map.set(rule[0], set);
    return map;
  }, new Map());
}

function sortLine(line: number[], list: ExclusionMap): number[] {
  const numbers = [...line];
  let changed = true;

  while (changed) {
    changed = false;
    for (let i = 0; i < numbers.length - 1; i++) {
      const num = numbers[i];
      const next = numbers[i + 1];

      const exclusions = list.get(next) ?? new Set();

      if (exclusions.has(num)) {
        numbers[i + 1] = num;
        numbers[i] = next;
        changed = true;
      }
    }
  }

  return numbers;
}
