class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        
        # Initialize the queue with all initially rotten oranges
        # and count the fresh oranges.
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 2:
                    queue.append((i, j, 0))  # (row, col, minute)
                elif grid[i][j] == 1:
                    fresh += 1
        
        max_minutes = 0
        
        # Perform BFS.
        while queue:
            i, j, minutes = queue.popleft()
            max_minutes = max(max_minutes, minutes)
            
            for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                ni, nj = i + di, j + dj
                # Check if the neighbor is within bounds and is a fresh orange.
                if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] == 1:
                    grid[ni][nj] = 2  # Mark as rotten.
                    fresh -= 1
                    queue.append((ni, nj, minutes + 1))
        
        # If there are still fresh oranges, return -1.
        return max_minutes if fresh == 0 else -1

