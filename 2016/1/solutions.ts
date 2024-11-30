const directions = ["n", "e", "s", "w"];

export function part01(input: string): number {
  const commands = input.split(", ");

  const finalDistance = commands.reduce((pos, command) => {
    const direction = command[0];
    const steps = parseInt(command.slice(1), 10);

    pos.index = getNewIndex(direction, pos.index);

    const cardinalDirection = directions[pos.index];

    switch (cardinalDirection) {
      case "n":
        pos.y += steps;
        break;
      case "s":
        pos.y -= steps;
        break;
      case "e":
        pos.x += steps;
        break;
      case "w":
        pos.x -= steps;
        break;
    }

    return pos;
  }, { x: 0, y: 0, index: 0 });

  return Math.abs(finalDistance.x) + Math.abs(finalDistance.y);
}

export function part02(input: string): number {
  const commands = input.split(", ");
  const uniquePositions = new Set();
  uniquePositions.add("00");
  let index = 0;
  const pos = { x: 0, y: 0 };

  for (const command of commands) {
    const direction = command[0];
    let steps = parseInt(command.slice(1), 10);

    index = getNewIndex(direction, index);

    const key = index % 2 === 0 ? "y" : "x";
    const nextIncrement = index >= 2 ? -1 : 1;

    while (steps > 0) {
      pos[key] += nextIncrement;

      const hash = `${pos.x}${pos.y}`;

      if (uniquePositions.has(hash)) {
        return Math.abs(pos.x) + Math.abs(pos.y);
      }

      uniquePositions.add(hash);
      steps--;
    }
  }

  return 0;
}

function getNewIndex(direction: string, index: number) {
  if (direction === "L") {
    return index === 0 ? directions.length - 1 : index - 1;
  }

  return index === directions.length - 1 ? 0 : index + 1;
}
