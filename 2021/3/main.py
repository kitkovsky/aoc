with open("./data.txt") as file:
    data = file.readlines()
    data = [line.strip() for line in data]


def findMostCommonDigits(data):
    binArr = [0] * len(data[0])

    for number in data:
        for idx, digit in enumerate(number):
            if digit == "0":
                binArr[idx] -= 1
            else:
                binArr[idx] += 1

    return binArr


def findMostCommonDigit(data, colIdx):
    result = 0
    for line in data:
        result += 1 if line[colIdx] == "1" else -1

    return "1" if result >= 0 else "0"


def findLeastCommonDigit(data, colIdx):
    result = 0
    for line in data:
        result += 1 if line[colIdx] == "1" else -1

    return "0" if result >= 0 else "1"


def findOxygenRating(data):
    workData = data.copy()
    for colIdx in range(len(data[0])):
        mostCommon = findMostCommonDigit(workData, colIdx)
        popArr = []
        for numIdx, binNum in enumerate(workData):
            if binNum[colIdx] != mostCommon:
                popArr.append(numIdx)
        for popIdx in reversed(popArr):
            workData.pop(popIdx)
        if len(workData) == 1:
            return workData[0]


def findCarbonRating(data):
    workData = data.copy()
    for colIdx in range(len(data[0])):
        mostCommon = findLeastCommonDigit(workData, colIdx)
        popArr = []
        for numIdx, binNum in enumerate(workData):
            if binNum[colIdx] != mostCommon:
                popArr.append(numIdx)
        for popIdx in reversed(popArr):
            workData.pop(popIdx)
        if len(workData) == 1:
            return workData[0]


def part1(data):
    gamma = ""
    epsilon = ""
    binArr = findMostCommonDigits(data)

    for digit in binArr:
        if digit > 0:
            gamma += "1"
            epsilon += "0"
        else:
            gamma += "0"
            epsilon += "1"

    print(int(gamma, 2) * int(epsilon, 2))


def part2(data):
    binOxygenRating = findOxygenRating(data)
    binCarbonRating = findCarbonRating(data)
    if binOxygenRating is None or binCarbonRating is None:
        return -1
    print(int(binOxygenRating, 2) * int(binCarbonRating, 2))


if __name__ == "__main__":
    part1(data)
    part2(data)
