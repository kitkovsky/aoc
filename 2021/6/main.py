def part1(data):
    workData = data.copy()
    for _ in range(80):
        newFish = 0
        for idx, number in enumerate(workData):
            if number != 0:
                workData[idx] -= 1
            else:
                workData[idx] = 6
                newFish += 1
        for _ in range(newFish):
            workData.append(8)

    print(len(workData))


def part2(data):
    workData = data.copy()
    fish = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    for number in workData:
        fish[number] += 1
    print(f"initial state: {fish}")
    for day in range(256):
        newFishArr = []
        for idx in range(9):
            newFishArr.append(fish[idx])
            fish[idx] -= fish[idx]
        for idx, num in enumerate(newFishArr):
            if idx == 0:
                fish[8] += num
                fish[6] += num
            else:
                fish[idx - 1] += num
        print(f"after {day+1} days: {fish}")

    sum = 0
    for _, value in fish.items():
        sum += value

    print(sum)


if __name__ == "__main__":
    with open("./data.txt") as file:
        data = file.readline()
        data = [int(num) for num in data.strip().split(",")]

    # part1(data)
    part2(data)
