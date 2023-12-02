const input = await Bun.file("./input.txt").text();
const lines = input.split("\n").slice(0, -1);

const ans1 = part1(lines);
const ans2 = part2(lines);
console.log(ans1, ans2);

function part1(lines: string[]): number {
  let idSum = 0;
  const limitations = new Map([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
  ]);

  lines.forEach((line) => {
    let possible = true;
    const gameId = parseInt(line.slice(line.indexOf(" "), line.indexOf(":")));
    line = line.slice(line.indexOf(":") + 2);

    const sets = line.split("; ");

    sets.forEach((set) => {
      const colors = set.split(", ");

      colors.forEach((color) => {
        const [count, colorName] = color.split(" ");

        if (parseInt(count) > limitations.get(colorName)!) {
          possible = false;
        }
      });
    });

    if (possible) idSum += gameId;
  });

  return idSum;
}

function part2(lines: string[]): number {
  let powersSum = 0;

  lines.forEach((game) => {
    const minCubesCount = new Map([
      ["red", 0],
      ["green", 0],
      ["blue", 0],
    ]);
    const pulls = game.slice(game.indexOf(":") + 2).split("; ");

    pulls.forEach((set) => {
      const colors = set.split(", ");

      colors.forEach((color) => {
        const [count, colorName] = color.split(" ");

        if (parseInt(count) > minCubesCount.get(colorName)!) {
          minCubesCount.set(colorName, parseInt(count));
        }
      });
    });

    powersSum += Array.from(minCubesCount.values()).reduce(
      (acc, num) => acc * num,
      1,
    );
  });

  return powersSum;
}
