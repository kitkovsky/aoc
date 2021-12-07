def part1(data):
    fuelArr = []
    maxVal = max(data)
    for pos in range(maxVal + 1):
        fuelUsage = 0
        for num in data:
            fuelUsage += abs(num - pos)
        fuelArr.append(fuelUsage)
    print(min(fuelArr))


def part2(data):
    fuelArr = []
    maxVal = max(data)
    for pos in range(maxVal + 1):
        print(f"{pos}/{maxVal}")
        fuelUsage = 0
        for num in data:
            fuelUsage += abs(num - pos) + extraCost(abs(num - pos))
        fuelArr.append(fuelUsage)
    print(min(fuelArr))


def extraCost(nSteps):
    if nSteps == 0 or nSteps == 1:
        return 0
    else:
        sum = 0
        step = 1
        while nSteps > 1:
            sum += step
            step += 1
            nSteps -= 1
        return sum


if __name__ == "__main__":
    with open("./data.txt") as file:
        data = file.readline()
        data = [int(num) for num in data.strip().split(",")]

    # part1(data)
    part2(data)
