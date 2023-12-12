const file = await Bun.file("./input.txt").text();
const lines = file
  .split("\n")
  .slice(0, -1)
  .map((l) => l.split(""));

type coord = {
  x: number;
  y: number;
};

const pipeToTileMap: Record<string, coord[]> = {
  "|": [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ],
  "-": [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
  ],
  L: [
    { x: -1, y: 0 },
    { x: 0, y: 1 },
  ],
  J: [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
  ],
  "7": [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
  ],
  F: [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
  ],
};

function createFillMap(map: string[][]): string[][] {
  const fillMap = Array(map.length * 3)
    .fill(".")
    .map(() => Array(map[0].length * 3).fill("."));

  map.forEach((row, x) => {
    row.forEach((cell, y) => {
      switch (cell) {
        case ".":
        case "S":
          break;
        default:
          fillMap[x * 3 + 1][y * 3 + 1] = "#";
          pipeToTileMap[cell].forEach(
            (coord) =>
              (fillMap[x * 3 + 1 + coord.x][y * 3 + 1 + coord.y] = "#"),
          );
          break;
      }
    });
  });

  return fillMap;
}

const startingPoint = {
  x: lines.findIndex((l) => l.includes("S")) * 3 + 1,
  y:
    lines[lines.findIndex((l) => l.includes("S"))].findIndex(
      (char) => char === "S",
    ) *
      3 +
    1,
};

const fillMap = createFillMap(lines);
const searchSteps = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

searchSteps
  .map(([x, y]) => [x * 2, y * 2])
  .forEach(([x, y]) => {
    if (fillMap[startingPoint.x + x][startingPoint.y + y] === "#")
      fillMap[startingPoint.x + x / 2][startingPoint.y + y / 2] = "#";
  });
fillMap[startingPoint.x][startingPoint.y] = "#";

function part1(): number {
  let queue: coord[] = [{ x: startingPoint.x, y: startingPoint.y }];
  let visited: coord[] = [];

  while (queue.length > 0) {
    let coord = queue.shift()!;
    visited.push(coord);

    searchSteps.forEach(([x, y]) => {
      const nextCoord = { x: coord.x + x, y: coord.y + y };
      if (
        fillMap[nextCoord.x][nextCoord.y] === "#" &&
        !visited.some((c) => c.x === nextCoord.x && c.y === nextCoord.y)
      )
        queue.push({ x: nextCoord.x, y: nextCoord.y });
    });
  }

  return (visited.length - 1) / 6;
}

console.log(part1());
