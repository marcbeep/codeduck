class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        
        def dfs(x, y, index, visited):
            if index == len(word):
                return True
            if (x < 0 or x >= rows or 
                y < 0 or y >= cols or 
                board[x][y] != word[index] or 
                (x, y) in visited):
                return False

            visited.add((x, y))
            res = (dfs(x+1, y, index+1, visited) or
                   dfs(x-1, y, index+1, visited) or
                   dfs(x, y+1, index+1, visited) or
                   dfs(x, y-1, index+1, visited))
            visited.remove((x, y))
            return res

        for i in range(rows):
            for j in range(cols):
                if dfs(i, j, 0, set()):
                    return True
        return False
