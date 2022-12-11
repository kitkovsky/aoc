with open("./data.txt") as file:
    data = file.readlines()
    data = [line.strip() for line in data]


def part1(data):
    depth = 0
    pos = 0

    for line in data:
        line = line.split()
        command = line[0]
        val = int(line[1])
        if command == "forward":
            pos += val
        elif command == "down":
            depth += val
        else:  # up
            depth -= val

    print(depth * pos)


def part2(data):
    aim = 0
    pos = 0
    depth = 0

    for line in data:
        line = line.split()
        command = line[0]
        val = int(line[1])
        if command == "down":
            aim += val
        elif command == "up":
            aim -= val
        else:  # forward
            pos += val
            depth += aim * val

    print(depth * pos)


if __name__ == "__main__":
    part1(data)
    part2(data)
