struct Move {
    opponent_move: char,
    my_move: char,
}

impl Move {
    fn calculate(&self) -> u32 {
        let move_points = match self.my_move {
            'X' => 1,
            'Y' => 2,
            'Z' => 3,
            _ => 0,
        };

        let result_points = match self.opponent_move {
            'A' => match self.my_move {
                'X' => 3,
                'Y' => 6,
                'Z' => 0,
                _ => 0,
            },
            'B' => match self.my_move {
                'X' => 0,
                'Y' => 3,
                'Z' => 6,
                _ => 0,
            },
            'C' => match self.my_move {
                'X' => 6,
                'Y' => 0,
                'Z' => 3,
                _ => 0,
            },
            _ => 0,
        };

        return move_points + result_points;
    }
}

fn part1(input: &String) -> u32 {
    return input
        .lines()
        .map(|line| {
            return Move {
                opponent_move: line.chars().nth(0).unwrap(),
                my_move: line.chars().nth(2).unwrap(),
            }
            .calculate();
        })
        .sum();
}

fn part2(input: &String) -> u32 {
    return input
        .lines()
        .map(|line| {
            let bytes = line.as_bytes();
            let left = (bytes[0] - b'A') as i8;
            let right = (bytes[2] - b'X') as i8;
            let my_move = (left - 1 + right).rem_euclid(3);

            let move_points = my_move + 1;
            let outcome_points = right * 3;

            return (move_points + outcome_points) as u32;
        })
        .sum();
}

fn main() {
    let input = std::fs::read_to_string("./src/prod.txt").unwrap();

    // let score = part1(&input);
    let score = part2(&input);

    println!("{}", score);
}
