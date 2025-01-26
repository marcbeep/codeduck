class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        m, n = len(board), len(board[0])
        
        def countLiveNeighbors(x, y):
            directions = [(-1, -1), (-1, 0), (-1, 1), 
                          (0, -1),         (0, 1), 
                          (1, -1), (1, 0), (1, 1)]
            liveNeighbors = 0
            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n and (board[nx][ny] == 1 or board[nx][ny] == -1):
                    liveNeighbors += 1
            return liveNeighbors
        
        for i in range(m):
            for j in range(n):
                liveNeighbors = countLiveNeighbors(i, j)
                if board[i][j] == 1 and (liveNeighbors < 2 or liveNeighbors > 3):
                    board[i][j] = -1
                if board[i][j] == 0 and liveNeighbors == 3:
                    board[i][j] = 2
        
        for i in range(m):
            for j in range(n):
                if board[i][j] == -1:
                    board[i][j] = 0
                elif board[i][j] == 2:
                    board[i][j] = 1
