with open("./data.txt") as file:
    data = file.readlines()
    data = [int(line.strip()) for line in data]


def part1(data):
    result = 0
    prev = 0
    curr = 0

    for i, val in enumerate(data):
        if i == 0:
            prev = val
            continue
        curr = val
        if curr > prev:
            result += 1
        prev = curr

    print(result)


def part2(data):
    result = 0
    prev = 0
    curr = 0

    for i in range(len(data)):
        if i == 0:
            prev = data[0] + data[1] + data[2]
            continue
        if i == len(data) - 2:
            print(result)
            return
        curr = data[i] + data[i + 1] + data[i + 2]
        if curr > prev:
            result += 1
        prev = curr


if __name__ == "__main__":
    part1(data)
    part2(data)
