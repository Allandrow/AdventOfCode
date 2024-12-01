export function part01(input: string): number {
  const commands = input.split("");

  const visited = new Set();
  visited.add("0|0");

  let count = 1;

  const pos = { x: 0, y: 0 };

  commands.forEach((command) => {
    setNextPos(pos, command);

    const hash = `${pos.x}|${pos.y}`;

    if (!visited.has(hash)) {
      count++;
      visited.add(hash);
    }
  });

  return count;
}

export function part02(input: string): number {
  const commands = input.split("");

  const visited = new Set();
  visited.add("0|0");

  let count = 1;

  const santaPos = { x: 0, y: 0 };
  const robotPos = { x: 0, y: 0 };

  commands.forEach((command, i) => {
    const usedPos = i % 2 === 0 ? santaPos : robotPos;
    setNextPos(usedPos, command);

    const hash = `${usedPos.x}|${usedPos.y}`;

    if (!visited.has(hash)) {
      count++;
      visited.add(hash);
    }
  });

  return count;
}

function setNextPos(pos: { x: number; y: number }, command: string) {
  switch (command) {
    case "^":
      pos.y++;
      break;
    case "v":
      pos.y--;
      break;
    case ">":
      pos.x++;
      break;
    case "<":
      pos.x--;
      break;
  }
}
