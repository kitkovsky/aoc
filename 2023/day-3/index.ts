const file = await Bun.file("./input.txt").text();
const lines = file.split("\n").slice(0, -1);

const ans1 = part1(lines);
const ans2 = part2(lines);
console.log(ans1, ans2);

type Number = {
  x: number;
  l: number;
  r: number;
  value: number;
};

function getNumbersFromLine(line: string, idx: number): Number[] {
  const numbers: Number[] = [];
  const regex = /(\d+)/g;
  let match = regex.exec(line);

  while (match) {
    const number: Number = {
      x: idx,
      l: match.index,
      r: match.index + match[0].length - 1,
      value: parseInt(match[0]),
    };

    numbers.push(number);
    match = regex.exec(line);
  }

  return numbers;
}

function part1(lines: string[]): number {
  let sum = 0;
  const numbers: Number[] = [];

  lines.forEach((line, idx) => {
    getNumbersFromLine(line, idx).forEach((num) => numbers.push(num));
  });

  numbers.forEach((num) => {
    let isAdjacentToSymbol = false;

    const minXIdx = Math.max(0, num.x - 1);
    const maxXIdx = Math.min(lines.length - 1, num.x + 1);
    const minYIdx = Math.max(0, num.l - 1);
    const maxYIdx = Math.min(lines[0].length - 1, num.r + 1);

    for (let x = minXIdx; x <= maxXIdx; x++) {
      for (let y = minYIdx; y <= maxYIdx; y++) {
        if (x === num.x && y >= num.l && y <= num.r) continue;

        const char = lines[x][y];

        if (char !== ".") {
          isAdjacentToSymbol = true;
          break;
        }
      }

      if (isAdjacentToSymbol) break;
    }

    if (isAdjacentToSymbol) {
      sum += num.value;
    }
  });

  return sum;
}

function part2(lines: string[]): number {
  let sum = 0;
  const numbers: Number[] = [];
  const gearsMap = new Map<string, Number[]>();

  lines.forEach((line, idx) => {
    getNumbersFromLine(line, idx).forEach((num) => numbers.push(num));
  });

  numbers.forEach((num) => {
    const minXIdx = Math.max(0, num.x - 1);
    const maxXIdx = Math.min(lines.length - 1, num.x + 1);
    const minYIdx = Math.max(0, num.l - 1);
    const maxYIdx = Math.min(lines[0].length - 1, num.r + 1);

    for (let x = minXIdx; x <= maxXIdx; x++) {
      for (let y = minYIdx; y <= maxYIdx; y++) {
        if (x === num.x && y >= num.l && y <= num.r) continue;

        const char = lines[x][y];

        if (char === "*") {
          const key = `${x}${y}`;
          gearsMap.set(key, [...(gearsMap.get(key) ?? []), num]);
        }
      }
    }
  });

  Array.from(gearsMap).forEach(([_, v]) => {
    if (v.length === 2) {
      sum += v.reduce((acc, num) => acc * num.value, 1);
    }
  });

  return sum;
}
