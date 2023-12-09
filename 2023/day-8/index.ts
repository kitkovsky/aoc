const file = await Bun.file("./input.txt").text();
const lines = file.split("\n").slice(0, -1);
const instructions = lines[0].split("");

function gcdOverTwo(x: number, y: number): number {
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function gcd(x: number, y: number): number {
  return gcdOverTwo(x, y);
}

function lcmOverTwo(x: number, y: number): number {
  return Math.abs((x * y) / gcd(x, y));
}

function lcm(x: number[]): number {
  return x.reduce((prev, curr) => lcmOverTwo(prev, curr), 1);
}

type Node = {
  self: string;
  l: string;
  r: string;
};

const nodesMap: Map<string, Node> = new Map();
lines.slice(2).forEach((line) => {
  const [value, nodes] = line.split("=").map((s) => s.trim());
  const [l, r] = nodes.replace("(", "").replace(")", "").split(", ");

  nodesMap.set(value, { self: value, l, r });
});

function part1(): number {
  let curr = nodesMap.get("AAA")!;
  let i = 0;

  while (curr.self !== "ZZZ") {
    const inst = instructions[i % instructions.length];
    curr = inst === "L" ? nodesMap.get(curr.l)! : nodesMap.get(curr.r)!;
    i++;
  }

  return i;
}

function part2(): number {
  const startingNodes = Array.from(nodesMap.values()).filter((node) =>
    node.self.endsWith("A"),
  );
  const counters: number[] = [];

  startingNodes.forEach((n) => {
    let curr = n;
    let i = 0;

    while (!curr.self.endsWith("Z")) {
      const inst = instructions[i % instructions.length];
      curr = inst === "L" ? nodesMap.get(curr.l)! : nodesMap.get(curr.r)!;
      i++;
    }

    counters.push(i);
  });

  return lcm(counters);
}

console.log(part1(), part2());
