const file = await Bun.file("./input.txt").text();
const lines = file.split("\n").slice(0, -1);

const numberRegex = /(\d+)/g;

const ans1 = part1(lines);
const ans2 = part2(lines);
console.log(ans1, ans2);

function part1(lines: string[]): number {
  let points = 0;

  lines.forEach((line) => {
    let wonNumbersCount = 0;
    const winningNumbers = getWinningNumbers(line);
    const myNumbers = getMyNumbers(line);

    myNumbers.forEach((myNumber) => {
      if (winningNumbers.includes(myNumber)) wonNumbersCount++;
    });

    if (wonNumbersCount) points += Math.pow(2, wonNumbersCount - 1);
  });

  return points;
}

function part2(lines: string[]): number {
  let i = 0;
  let line = lines[i];
  const linesMap = new Map<number, number>();
  lines.forEach((_, idx) => {
    linesMap.set(idx + 1, 1);
  });

  while (line) {
    let wonNumbersCount = 0;
    const winningNumbers = getWinningNumbers(line);
    const myNumbers = getMyNumbers(line);

    myNumbers.forEach((myNumber) => {
      if (winningNumbers.includes(myNumber)) wonNumbersCount++;
    });

    const copiesMap = createLinesMap({
      currIdx: i,
      wonNumbersCount,
      copies: linesMap.get(i + 1)!,
    });

    copiesMap.forEach((v, k) => {
      linesMap.set(k, linesMap.get(k)! + v);
    });

    i += 1;
    line = lines[i];
  }

  return Array.from(linesMap.values()).reduce((acc, card) => acc + card, 0);
}

function createLinesMap({
  wonNumbersCount,
  currIdx,
  copies,
}: {
  wonNumbersCount: number;
  currIdx: number;
  copies: number;
}): Map<number, number> {
  const linesMap = new Map<number, number>();

  for (let i = currIdx + 1; i <= currIdx + wonNumbersCount; ++i) {
    linesMap.set(i + 1, copies);
  }

  return linesMap;
}

function getWinningNumbers(line: string): number[] {
  const winningNumbers: number[] = [];
  const winningNumbersString = line.slice(line.indexOf(":"), line.indexOf("|"));

  let match = numberRegex.exec(winningNumbersString);

  while (match) {
    winningNumbers.push(parseInt(match[0]));
    match = numberRegex.exec(winningNumbersString);
  }

  return winningNumbers;
}

function getMyNumbers(line: string): number[] {
  const myNumbers: number[] = [];
  const myNumbersString = line.slice(line.indexOf("|"));

  let match = numberRegex.exec(myNumbersString);

  while (match) {
    myNumbers.push(parseInt(match[0]));
    match = numberRegex.exec(myNumbersString);
  }

  return myNumbers;
}
