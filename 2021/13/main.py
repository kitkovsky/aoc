def newPart1(points, folds):
    # store the coordinates of each point and manipulate these
    # don't bother with the array and printing that
    # coord of point after fold = foldVal - abs(coordVal - foldVal)
    # or: 2 * foldVal - coordVal
    for fold in folds:
        foldVal = int(fold[2:])
        if fold[0] == "x":  # vertical fold
            for point in points:
                if point[1] > foldVal:
                    point[1] = 2 * foldVal - point[1]
        else:  # horizontal fold
            for point in points:
                if point[0] > foldVal:
                    point[0] = 2 * foldVal - point[0]

    printPoints(points)


def printPoints(arr):
    nRows, nCols = 0, 0
    for point in arr:
        if point[0] > nRows:
            nRows = point[0]
        if point[1] > nCols:
            nCols = point[1]

    sheet = [["." for _ in range(nCols + 1)] for _ in range(nRows + 1)]
    for point in arr:
        sheet[point[0]][point[1]] = "#"
    sum = 0
    for line in sheet:
        for char in line:
            if char == "#":
                sum += 1
    for line in sheet:
        print(line)
    # print(sum)


if __name__ == "__main__":
    with open("./data.txt") as file:
        points = []
        while True:
            newLine = file.readline().strip()
            if newLine == "":
                break
            else:
                points.append([int(num) for num in newLine.split(",")])
        folds = [line.strip().split(" ")[2] for line in file.readlines()]

    for point in points:
        point.reverse()

    newPart1(points, folds)
    # print(answer1)
