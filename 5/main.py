FLOOR_SIZE = 1000


def part1(data, floorMap=None, result=None):
    workData = data.copy()
    floorMap = [[0 for _ in range(FLOOR_SIZE)] for _ in range(FLOOR_SIZE)]
    result = 0
    for pair in workData:
        x1, y1 = [int(num) for num in pair[0].split(",")]
        x2, y2 = [int(num) for num in pair[1].split(",")]
        if x1 == x2:
            yStart = min(y1, y2)
            for y in range(abs(y2 - y1) + 1):
                floorMap[yStart + y][x1] += 1
        elif y1 == y2:
            xStart = min(x1, x2)
            for x in range(abs(x2 - x1) + 1):
                floorMap[y1][xStart + x] += 1

    for row in floorMap:
        for cell in row:
            if cell >= 2:
                result += 1

    for row in floorMap:
        print(row)
    print(result)


def part2(data):
    workData = data.copy()
    floorMap = [[0 for _ in range(FLOOR_SIZE)] for _ in range(FLOOR_SIZE)]
    result = 0
    for pair in workData:
        x1, y1 = [int(num) for num in pair[0].split(",")]
        x2, y2 = [int(num) for num in pair[1].split(",")]
        if x1 == x2:
            yStart = min(y1, y2)
            for y in range(abs(y2 - y1) + 1):
                floorMap[yStart + y][x1] += 1
        elif y1 == y2:
            xStart = min(x1, x2)
            for x in range(abs(x2 - x1) + 1):
                floorMap[y1][xStart + x] += 1
        elif x1 < x2 and y1 < y2:
            for i in range(x2 - x1 + 1):
                floorMap[y1 + i][x1 + i] += 1
        elif x1 > x2 and y1 > y2:
            for i in range(x1 - x2 + 1):
                floorMap[y1 - i][x1 - i] += 1
        elif x1 < x2 and y1 > y2:
            for i in range(x2 - x1 + 1):
                floorMap[y1 - i][x1 + i] += 1
        elif x1 > x2 and y1 < y2:
            for i in range(x1 - x2 + 1):
                floorMap[y1 + i][x1 - i] += 1

    for row in floorMap:
        for cell in row:
            if cell >= 2:
                result += 1

    # for row in floorMap:
        # print(row)
    print(result)


if __name__ == "__main__":
    with open("./data.txt") as file:
        data = file.readlines()
        data = [line.strip().split(" -> ") for line in data]

    # part1(data)
    part2(data)
