type File = { value: number | null; size: number };

export function part01(input: string): number {
  const arr = formatInput(input);
  const ordered = orderArray(arr);
  return ordered.reduce((sum, num, i) => {
    return sum + num * i;
  }, 0);
}

export function part02(input: string): number {
  const arr = formatInput2(input);
  const ordered = orderArray2(arr);
  const transformed = transformArray(ordered);

  return transformed.reduce((sum, num, i) => {
    return sum + num * i;
  }, 0);
}

function orderArray(arr: (number | null)[]): number[] {
  const result = [...arr];

  let i = 0;

  while (i < result.length) {
    if (arr[i] === null) {
      const lastIndex = result.findLastIndex((v) => v !== null);

      if (lastIndex < i) {
        console.log("we went over");
        break;
      }

      result[i] = result[lastIndex];
      result[lastIndex] = null;
    }
    i++;
  }

  return result.map((n) => n ?? 0);
}

function orderArray2(arr: File[]): File[] {
  let result = [...arr];

  let id = arr.filter(({ value }) => value !== null).length - 1;

  while (id > 0) {
    for (let i = result.length - 1; i > 0; i--) {
      if (result[i].value !== id) {
        continue;
      }
      const file = { ...result[i] };
      const index = result.findIndex((space) =>
        space.value === null && space.size >= file.size
      );

      // file is already placed
      if (index > i) {
        id--;
        continue;
      }

      // no space available for id
      if (index === -1) {
        console.log("nothing for id", id);
        id--;
        continue;
      }

      if (result[index].size === file.size) {
        // moved file has same size as empty space, replace the spaces
        result[index].value = file.value;
        result[i].value = null;
        id--;
      } else {
        // moved file is smaller, add moved file and reduce space from the other
        // while also updating previous file space
        const updatedNullFile = result[index];
        updatedNullFile.size -= file.size;
        const updatedIdFile = { ...result[i] };
        updatedIdFile.value = null;
        result = [
          ...result.slice(0, index),
          file,
          updatedNullFile,
          ...result.slice(index + 1),
        ];
        result[i + 1].value = null;
        id--;
      }
    }
  }

  return result;
}

function transformArray(arr: File[]): number[] {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const { size, value } = arr[i];
    for (let j = 0; j < size; j++) {
      result.push(value ?? 0);
    }
  }

  return result;
}

function formatInput(input: string): (number | null)[] {
  const arr = [];
  let index = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < Number(input[i]); j++) {
      if (i % 2 === 1) {
        arr.push(null);
      } else {
        arr.push(index);
      }
    }

    if (i % 2 === 0) {
      index++;
    }
  }

  return arr;
}

function formatInput2(input: string): File[] {
  const arr = [];
  let index = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "0") {
      continue;
    }
    const file: File = {
      size: Number(input[i]),
      value: i % 2 === 0 ? index : null,
    };
    arr.push(file);
    if (i % 2 === 0) {
      index++;
    }
  }

  return arr;
}
