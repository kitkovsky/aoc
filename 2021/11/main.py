import time

def part1(data, nSteps):
    nFlashes = 0
    for i in range(nSteps):
        workData = data.copy()
        # part 1
        for r, row in enumerate(workData):
            for c, num in enumerate(row):
                workData[r][c] += 1
        # part 2
        allFlashes = []
        while True:
            # find every octopus that can flash
            # if more than 0, increase adjacent
            # check if any new flash candidates appear
            # if so, increase again
            # repeat those two steps until no new flash candidates appear
            newFlashes = []
            for r, row in enumerate(workData):
                for c, num in enumerate(row):
                    if num > 9 and (r, c) not in allFlashes:
                        nFlashes += 1
                        newFlashes.append((r, c))
                        allFlashes.append((r, c))
            if len(newFlashes) > 0:
                for newFlash in newFlashes:
                    increaseAdj(newFlash, workData)
            elif len(newFlashes) == 0:
                break
        # part 3
        for flash in allFlashes:
            workData[flash[0]][flash[1]] = 0

        # print(f"after step {i + 1}")
        # for line in workData:
            # print(line)

    return nFlashes


def part2(data, nSteps):
    nFlashes = 0
    for i in range(nSteps):
        workData = data.copy()
        # part 1
        for r, row in enumerate(workData):
            for c, num in enumerate(row):
                workData[r][c] += 1
        # part 2
        allFlashes = []
        while True:
            # find every octopus that can flash
            # if more than 0, increase adjacent
            # check if any new flash candidates appear
            # if so, increase again
            # repeat those two steps until no new flash candidates appear
            newFlashes = []
            for r, row in enumerate(workData):
                for c, num in enumerate(row):
                    if num > 9 and (r, c) not in allFlashes:
                        nFlashes += 1
                        newFlashes.append((r, c))
                        allFlashes.append((r, c))
            if len(newFlashes) > 0:
                for newFlash in newFlashes:
                    increaseAdj(newFlash, workData)
            elif len(newFlashes) == 0:
                break
        # part 3
        for flash in allFlashes:
            workData[flash[0]][flash[1]] = 0

        nZeros = 0
        for line in workData:
            for num in line:
                if num == 0:
                    nZeros += 1
        if nZeros == 100:
            return i + 1


def increaseAdj(coords, workData):
    moves = [(-1, 0), (0, 1), (1, 0), (0, -1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
    for move in moves:
        r = coords[0] + move[0]
        c = coords[1] + move[1]
        if r >= 0 and r <= 9 and c >= 0 and c <= 9:
            workData[r][c] += 1


if __name__ == "__main__":
    with open("./data.txt") as file:
        data = [[int(num) for num in line.strip()] for line in file]

    # answer1 = part1(data, 400)
    # print(answer1)
    answer2 = part2(data, 300)
    print(answer2)
