class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        digits = set()

        for i in range(len(board)):
            for j in range(len(board)):
                currNum = board[i][j]
                if currNum == ".":
                    continue
                if currNum not in digits:
                    digits.add(currNum)
                else:
                    return False
            digits.clear()

        for i in range(len(board)):
            for j in range(len(board)):
                currNum = board[j][i]
                if currNum == ".":
                    continue
                if currNum not in digits:
                    digits.add(currNum)
                else:
                    return False
            digits.clear()

        for boxRow in range(0, 9, 3):
            for boxCol in range(0, 9, 3):
                for i in range(boxRow, boxRow + 3):
                    for j in range(boxCol, boxCol + 3):
                        currNum = board[i][j]
                        if currNum == ".":
                            continue
                        if currNum not in digits:
                            digits.add(currNum)
                        else:
                            return False
                digits.clear()

        return True
