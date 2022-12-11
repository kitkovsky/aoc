fn part1(lines: &str) -> u32 {
    let max: Option<u32> = lines
        .split("\n\n")
        .map(|chunk| chunk.split("\n").flat_map(|num| num.parse::<u32>()).sum())
        .max();

    return match max {
        Some(max) => max,
        None => 0,
    };
}

fn part2(lines: &str) -> u32 {
    let mut chunks: Vec<u32> = lines
        .split("\n\n")
        .map(|chunk| chunk.split("\n").flat_map(|num| num.parse::<u32>()).sum())
        .collect();

    chunks.sort_by(|a, b| b.cmp(a));
    return chunks.iter().take(3).sum::<u32>();
}

fn main() {
    let lines = std::fs::read_to_string("./src/prod.txt").unwrap();

    let max = part1(&lines);
    let top3 = part2(&lines);

    println!("part1: {}", max);
    println!("part2: {}", top3);
}
