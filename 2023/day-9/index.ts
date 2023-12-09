const file = await Bun.file("./input.txt").text();
const lines = file
  .split("\n")
  .slice(0, -1)
  .map((l) => l.split(" ").map((n) => parseInt(n)));

function findNextStep(arr: number[][], part: 1 | 2): number {
  let nextStep = 0;
  let i = arr.length - 2;

  while (i >= 0) {
    if (part === 1) {
      const lastNum = arr[i][arr[i].length - 1];
      nextStep += lastNum;
    } else {
      const firstNum = arr[i][0];
      nextStep = firstNum - nextStep;
    }
    i--;
  }

  return nextStep;
}

function ans(part: 1 | 2): number {
  const nextSteps: number[] = [];

  lines.forEach((line) => {
    const bigArr: number[][] = [line];
    let curr: number[] = line;

    while (true) {
      const nextArr: number[] = curr.slice(1).map((n, idx) => n - curr[idx]);
      bigArr.push(nextArr);

      if (nextArr.every((n) => n === 0)) break;
      curr = nextArr;
    }

    nextSteps.push(findNextStep(bigArr, part));
  });

  return nextSteps.reduce((acc, n) => acc + n, 0);
}

console.log(ans(1), ans(2));
