const input = await Bun.file("./input.txt").text();
const lines = input.split("\n");

const answer1 = part1(lines);
const answer2 = part2(lines);

console.log(answer1, answer2);

function part1(lines: Array<string>): number {
  const res: Array<number> = [];

  lines.forEach((line) => {
    if (!line) return;

    let first: number;
    let last: number;

    [...line].forEach((char) => {
      const num = parseInt(char);
      if (num) {
        if (!first) {
          first = num;
        } else {
          last = num;
        }
      }
    });

    if (first && !last) last = first;

    res.push(first * 10 + last);
  });

  return res.reduce((a, b) => a + b, 0);
}

function part2(lines: Array<string>): number {
  const res: Array<number> = [];

  lines.forEach((line) => {
    if (!line) return;

    const fixedLine = replaceWordsWithNumbers(line);

    let first: number;
    let last: number;

    [...fixedLine].forEach((char) => {
      const num = parseInt(char);
      if (num) {
        if (!first) {
          first = num;
        } else {
          last = num;
        }
      }
    });

    if (first && !last) last = first;

    res.push(first * 10 + last);
  });

  return res.reduce((acc, num) => acc + num, 0);
}

function replaceWordsWithNumbers(line: string): string {
  if (line.length < 3) return line;

  let r = 3;

  // very stinky indeed
  const replacementsMap = [
    { word: "zero", number: "ze0o" },
    { word: "one", number: "o1e" },
    { word: "two", number: "t2o" },
    { word: "three", number: "thr3e" },
    { word: "four", number: "fo4r" },
    { word: "five", number: "fi5e" },
    { word: "six", number: "s6x" },
    { word: "seven", number: "sev7n" },
    { word: "eight", number: "eig8t" },
    { word: "nine", number: "ni9e" },
  ];

  while (r <= line.length) {
    const buf = line.slice(0, r);

    replacementsMap.forEach(({ word, number }) => {
      if (buf.includes(word)) line = line.replace(word, number);
    });

    r++;
  }

  return line;
}
