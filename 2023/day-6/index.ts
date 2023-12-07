const file = await Bun.file("./input.txt").text();
const lines = file.split("\n").slice(0, -1);

const ans1 = part1();
const ans2 = part2();

console.log(ans1, ans2);

function part1(): number {
  const times = lines[0]
    .slice(lines[0].indexOf(":"))
    .split(" ")
    .filter((num) => parseInt(num))
    .map((num) => parseInt(num));
  const distances = lines[1]
    .slice(lines[1].indexOf(":"))
    .split(" ")
    .filter((num) => parseInt(num))
    .map((num) => parseInt(num));

  const waysToWin: number[] = [];

  times.forEach((time, idx) => {
    let winsCount = 0;
    const distance = distances[idx];

    [...Array(time).keys()].forEach((n) => {
      const traveled = n * (time - n);
      if (traveled > distance) winsCount += 1;
    });

    waysToWin.push(winsCount);
  });

  return waysToWin.reduce((acc, n) => acc * n, 1);
}

function part2(): number {
  const time = parseInt(
    lines[0]
      .slice(lines[0].indexOf(":"))
      .split(" ")
      .filter((n) => parseInt(n))
      .join(""),
  );
  const distance = parseInt(
    lines[1]
      .slice(lines[1].indexOf(":"))
      .split(" ")
      .filter((n) => parseInt(n))
      .join(""),
  );

  let winsCount = 0;

  [...Array(time).keys()].forEach((n) => {
    const traveled = n * (time - n);
    if (traveled > distance) winsCount += 1;
  });

  return winsCount;
}
