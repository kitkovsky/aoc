const file = await Bun.file("./input.txt").text();
const lines = file.split("\n");

type Transformer = {
  start: number;
  end: number;
  offset: number;
};

type Map = Transformer[];

let transformers: Transformer[] = [];
const maps: Map[] = [];

lines.slice(3).forEach((line) => {
  if (line.includes(":")) return;
  if (line === "") {
    maps.push(transformers);
    transformers = [];
    return;
  }

  const [destRangeStart, srcRangeStart, rangeLen] = line.split(" ").map(Number);
  transformers.push({
    start: srcRangeStart,
    end: srcRangeStart + rangeLen - 1,
    offset: destRangeStart - srcRangeStart,
  });
});

function part1(lines: string[]): number {
  const seeds: number[] = lines[0].slice(7).split(" ").map(Number);
  const locations: number[] = [];

  return letItRip(seeds, locations);
}

function part2(lines: string[]): number {
  const twoNumbersRegex = /(\d+) (\d+)/g;
  const ranges: { startIdx: number; rangeLen: number }[] = [];

  let match = twoNumbersRegex.exec(lines[0]);
  while (match) {
    const startIdx = parseInt(match[1]);
    const rangeLen = parseInt(match[2]);
    ranges.push({ startIdx, rangeLen });

    match = twoNumbersRegex.exec(lines[0]);
  }

  return letItRipReverse(ranges);
}

function letItRipReverse(
  ranges: { startIdx: number; rangeLen: number }[],
): number {
  let minDestination = 0;
  let found = false;
  const reversedMaps = maps.toReversed();

  while (true) {
    let currentLooking = minDestination;

    reversedMaps.forEach((map) => {
      for (let i = 0; i <= map.length; i++) {
        if (i === map.length) {
          break;
        }
        const t = map[i];

        if (
          t.start + t.offset <= currentLooking &&
          t.end + t.offset >= currentLooking
        ) {
          currentLooking -= t.offset;
          break;
        } else {
        }
      }
    });

    ranges.forEach(({ startIdx, rangeLen }) => {
      const start = startIdx;
      const end = startIdx + rangeLen;

      if (currentLooking >= start && currentLooking <= end) found = true;
    });

    if (found) return minDestination;
    minDestination++;
  }
}

function letItRip(seeds: number[], locations: number[]): number {
  seeds.forEach((seed) => {
    let currSeed = seed;

    maps.forEach((map) => {
      for (let i = 0; i <= map.length; i++) {
        if (i === map.length) break;

        const transformer = map[i];
        if (currSeed >= transformer.start && currSeed <= transformer.end) {
          currSeed += transformer.offset;
          break;
        }
      }
    });

    locations.push(currSeed);
  });

  return locations.reduce((acc, curr) => (curr < acc ? curr : acc), Infinity);
}

const ans1 = part1(lines);
const ans2 = part2(lines);
console.log(ans1, ans2);
