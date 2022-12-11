def part1(data):
    risks = []
    for rowIdx, line in enumerate(data):
        for colIdx, num in enumerate(line):
            hasLower = False
            if colIdx > 0:  # left
                if data[rowIdx][colIdx - 1] <= num:
                    hasLower = True
            if colIdx != len(line) - 1:  # right
                if data[rowIdx][colIdx + 1] <= num:
                    hasLower = True
            if rowIdx != 0:  # top
                if data[rowIdx - 1][colIdx] <= num:
                    hasLower = True
            try:  # bottom
                if data[rowIdx + 1][colIdx] <= num:
                    hasLower = True
            except:
                pass

            if not hasLower:
                risks.append(num + 1)

    return sum(risks)


def part2(data):
    risks = []
    for rowIdx, line in enumerate(data):
        for colIdx, num in enumerate(line):
            hasLower = False
            if colIdx > 0:  # left
                if data[rowIdx][colIdx - 1] <= num:
                    hasLower = True
            if colIdx != len(line) - 1:  # right
                if data[rowIdx][colIdx + 1] <= num:
                    hasLower = True
            if rowIdx != 0:  # top
                if data[rowIdx - 1][colIdx] <= num:
                    hasLower = True
            try:  # bottom
                if data[rowIdx + 1][colIdx] <= num:
                    hasLower = True
            except:
                pass

            if not hasLower:
                findBasinSize(data, rowIdx, colIdx)

    return sum(risks)


def findBasinSize(data, rowIdx, colIdx):
    sum = 0
    num = data[rowIdx][colIdx]
    if colIdx > 0:  # left
        if data[rowIdx][colIdx - 1] > num and data[rowIdx][colIdx - 1] != 9:
            sum += 1
            sum += findBasinSize(data, rowIdx, colIdx - 1)
    if colIdx != len(data[0]) - 1:  # right
        if data[rowIdx][colIdx + 1] > num and data[rowIdx][colIdx + 1] != 9:
            sum += 1
            sum += findBasinSize(data, rowIdx, colIdx + 1)
    if rowIdx != 0:  # top
        if data[rowIdx - 1][colIdx] > num and data[rowIdx - 1][colIdx] != 9:
            sum += 1
            sum += findBasinSize(data, rowIdx - 1, colIdx)
    try:  # bottom
        if data[rowIdx + 1][colIdx] > num:
            sum += 1
            sum += findBasinSize(data, rowIdx + 1, colIdx)
    except:
        pass

    return sum


if __name__ == "__main__":
    with open("./example.txt") as file:
        data = file.readlines()
        data = [[int(num) for num in line.strip()] for line in data]

    result1 = part1(data)
    # print(result1)
    result2 = part2(data)
    print(result2)
