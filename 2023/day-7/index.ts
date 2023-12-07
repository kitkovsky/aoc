const file = await Bun.file("./input.txt").text();
const rawLines = file.split("\n").slice(0, -1);

type Hand = {
  cards: string;
  strength: number;
  bid: number;
};

const typeToStrengthMap: Record<string, number> = {
  "5": 7,
  "41": 6,
  "32": 5,
  "311": 4,
  "221": 3,
  "2111": 2,
  "11111": 1,
};

function part1(): number {
  const lines = rawLines.map((line) =>
    line
      .replaceAll("J", "B")
      .replaceAll("Q", "C")
      .replaceAll("K", "D")
      .replaceAll("A", "E")
      // has to be last
      .replaceAll("T", "A"),
  );

  const hands: Hand[] = lines.map((line) => {
    const [cards, bid] = line.split(" ");

    const cardsCounter = new Map<string, number>();
    cards.split("").forEach((card) => {
      cardsCounter.set(card, (cardsCounter.get(card) ?? 0) + 1);
    });
    const type = [...cardsCounter.values()].toSorted().toReversed().join("");

    return {
      cards,
      strength: typeToStrengthMap[type],
      bid: parseInt(bid),
    };
  });

  hands.sort((a, b) => {
    if (a.strength !== b.strength) return a.strength - b.strength;

    const aCardValues = a.cards.split("").map((card) => parseInt(card, 16));
    const bCardValues = b.cards.split("").map((card) => parseInt(card, 16));

    for (let i = 0; i < aCardValues.length; i++) {
      if (aCardValues[i] !== bCardValues[i])
        return aCardValues[i] - bCardValues[i];
    }

    throw new Error(`oops, a: ${a.cards}, b: ${b.cards}`);
  });

  return hands
    .map((hand, idx) => hand.bid * (idx + 1))
    .reduce((acc, num) => acc + num, 0);
}

function part2(): number {
  const lines = rawLines.map((line) =>
    line
      .replaceAll("J", "1")
      .replaceAll("Q", "B")
      .replaceAll("K", "C")
      .replaceAll("A", "D")
      // has to be last
      .replaceAll("T", "A"),
  );

  const hands: Hand[] = lines.map((line) => {
    const [cards, bid] = line.split(" ");

    const cardsCounter = new Map<string, number>();
    const bestCardsCounter = new Map<string, number>();
    cards.split("").forEach((card) => {
      cardsCounter.set(card, (cardsCounter.get(card) ?? 0) + 1);
    });

    const jokers = cardsCounter.get("1") ?? 0;
    if (jokers) {
      cardsCounter.forEach((v, k) => {
        if (k !== "1") bestCardsCounter.set(k, v);
      });

      for (let i = 0; i < jokers; i++) {
        const biggestCardGroup = [...bestCardsCounter.entries()]
          .toSorted(([_k1, v1], [_k2, v2]) => v1 - v2)
          .toReversed()[0];
        if (biggestCardGroup === undefined) break; // found all jokers

        const [k] = biggestCardGroup;
        bestCardsCounter.set(k, bestCardsCounter.get(k)! + 1);
      }

      console.log("before", cardsCounter, "after", bestCardsCounter);
    }

    const type =
      jokers && jokers !== 5 // big stink
        ? [...bestCardsCounter.values()].toSorted().toReversed().join("")
        : [...cardsCounter.values()].toSorted().toReversed().join("");

    return {
      cards,
      strength: typeToStrengthMap[type],
      bid: parseInt(bid),
    };
  });

  hands.sort((a, b) => {
    if (a.strength !== b.strength) return a.strength - b.strength;

    const aCardValues = a.cards.split("").map((card) => parseInt(card, 16));
    const bCardValues = b.cards.split("").map((card) => parseInt(card, 16));

    for (let i = 0; i < aCardValues.length; i++) {
      if (aCardValues[i] !== bCardValues[i])
        return aCardValues[i] - bCardValues[i];
    }

    throw new Error(`oops, a: ${a.cards}, b: ${b.cards}`);
  });

  return hands
    .map((hand, idx) => hand.bid * (idx + 1))
    .reduce((acc, num) => acc + num, 0);
}

console.log(part1(), part2());
