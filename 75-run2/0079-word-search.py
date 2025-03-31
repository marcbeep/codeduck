class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        
        def dfs(i, j, idx):
            if idx == len(word):
                return True
            if (i < 0 or i >= rows or
                j < 0 or j >= cols or
                board[i][j] != word[idx]):
                return False
            
            temp = board[i][j]
            board[i][j] = "#"  # Mark as visited

            # Explore all four directions
            found = (dfs(i+1, j, idx+1) or
                     dfs(i-1, j, idx+1) or
                     dfs(i, j+1, idx+1) or
                     dfs(i, j-1, idx+1))

            board[i][j] = temp  # Unmark visited
            return found

        for i in range(rows):
            for j in range(cols):
                if board[i][j] == word[0]:
                    if dfs(i, j, 0):
                        return True
        return False
