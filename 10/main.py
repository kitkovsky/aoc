openBrackets = "[{(<"
closeBrackets = "]})>"
pointsDict = {")": 3, "]": 57, "}": 1197, ">": 25137}
pointsDict2 = {"(": 1, "[": 2, "{": 3, "<": 4}


def part1(data):
    points = 0
    for line in data:
        brackets = []
        for bracket in line:
            if bracket in openBrackets:
                brackets.append(bracket)
            else:
                lastBracket = brackets.pop()
                if lastBracket != openBrackets[closeBrackets.find(bracket)]:
                    points += pointsDict[bracket]
                    continue
    return points


def part2(data):
    points = []
    for line in data:
        brackets = []
        score = 0
        for bracket in line:
            if bracket in openBrackets:
                brackets.append(bracket)
            else:
                lastBracket = brackets.pop()
                if lastBracket != openBrackets[closeBrackets.find(bracket)]:
                    continue
        for bracket in reversed(brackets):
            score *= 5
            score += pointsDict2[bracket]
        points.append(score)

    points.sort()
    return points[len(points) // 2]
    


if __name__ == "__main__":
    with open("./data.txt") as file:
        data = [line.strip() for line in file.readlines()]

    answer1 = part1(data)
    # print(answer1)
    answer2 = part2(data)
    print(answer2)
