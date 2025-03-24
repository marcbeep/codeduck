class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        def dfs(visited, index, x, y):
            if index == len(word):
                return True

            if x < 0 or y < 0 or x >= len(board) or y >= len(board[x]) or (x, y) in visited:
                return False

            if board[x][y] != word[index]:
                return False

            any_true = False
            any_true = any_true or dfs(visited + [(x, y)], index+1, x+1, y)
            any_true = any_true or dfs(visited + [(x, y)], index+1, x, y-1)
            any_true = any_true or dfs(visited + [(x, y)], index+1, x-1, y)
            any_true = any_true or dfs(visited + [(x, y)], index+1, x, y+1)

            return any_true
        
        any_true = False
        for x in range(len(board)):
            for y in range(len(board[x])):
                any_true = any_true or dfs([], 0, x, y)
                if any_true:
                    return any_true

        return any_true
