class BingoNumber:
    def __init__(self):
        self.value = 0
        self.marked = False


class Board:
    def __init__(self):
        self.board = [[BingoNumber() for _ in range(5)] for _ in range(5)]

    def print(self):
        for row in self.board:
            print(
                f"{row[0].value}, {row[1].value}, {row[2].value}, {row[3].value}, {row[4].value}"
            )
        print()


def loadBoards(data):
    boards = []
    lineIdx = 0
    newBoard = Board()
    rowIdx = 0
    for line in data:
        if lineIdx == 5:
            boards.append(newBoard)
            newBoard = Board()
            lineIdx = 0
            rowIdx = 0
        else:
            for colIdx, number in enumerate(line.split()):
                newBoard.board[rowIdx][colIdx].value = int(number)
            rowIdx += 1
            lineIdx += 1

    boards.append(newBoard)
    return boards


def findUnmarkedSum(board):
    sum = 0
    for row in board.board:
        for bingoNumber in row:
            if not bingoNumber.marked:
                sum += bingoNumber.value

    return sum


def part1(data, bingoNumbers):
    boards = loadBoards(data)
    bingoNumbers = [int(num) for num in bingoNumbers.split(",")]
    for number in bingoNumbers:
        for board in boards:
            arr = board.board
            for row in arr:
                for bingoNumber in row:
                    if bingoNumber.value == number:
                        bingoNumber.marked = True

        for board in boards:
            arr = board.board
            for row in arr:
                foundNotMarked = False
                for bingoNumber in row:
                    if not bingoNumber.marked:
                        foundNotMarked = True
                if not foundNotMarked:
                    sum = findUnmarkedSum(board)
                    print("didn't break, found a winning row")
                    print(f"number: {number} * sum: {sum} = {number * sum}")
                    return
            for x in range(5):
                foundNotMarked = False
                for y in range(5):
                    if not arr[y][x].marked:
                        foundNotMarked = True
                if not foundNotMarked:
                    sum = findUnmarkedSum(board)
                    print("didn't break, found a winning column")
                    print(f"number: {number} * sum: {sum} = {number * sum}")
                    return


def part2(data, bingoNumbers):
    boards = loadBoards(data)
    bingoNumbers = [int(num) for num in bingoNumbers.split(",")]
    lastWinningBoardScore = -1
    winningBoardsIdx = []
    for number in bingoNumbers:
        for board in boards:
            arr = board.board
            for row in arr:
                for bingoNumber in row:
                    if bingoNumber.value == number:
                        bingoNumber.marked = True

        for boardIdx, board in enumerate(boards):
            arr = board.board
            for row in arr:
                foundNotMarked = False
                for bingoNumber in row:
                    if not bingoNumber.marked:
                        foundNotMarked = True
                if not foundNotMarked:
                    if boardIdx not in winningBoardsIdx:
                        sum = findUnmarkedSum(board)
                        lastWinningBoardScore = sum * number
                        winningBoardsIdx.append(boardIdx)

            for x in range(5):
                foundNotMarked = False
                for y in range(5):
                    if not arr[y][x].marked:
                        foundNotMarked = True
                if not foundNotMarked:
                    if boardIdx not in winningBoardsIdx:
                        sum = findUnmarkedSum(board)
                        lastWinningBoardScore = sum * number
                        winningBoardsIdx.append(boardIdx)

    print(lastWinningBoardScore)


if __name__ == "__main__":
    with open("./data.txt") as file:
        inputNumbers = file.readline()
        file.readline()
        rawBoards = file.readlines()

    # part1(rawBoards, inputNumbers)
    part2(rawBoards, inputNumbers)
