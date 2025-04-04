class Solution:
    def orangesRotting(self, grid):
        # Get number of rows and columns
        rows = len(grid)
        cols = len(grid[0])
        
        # Create a queue for rotten oranges (store row, col, and minute)
        queue = deque()
        fresh_count = 0  # Count of fresh oranges
        
        # Loop through the grid to add initial rotten oranges to the queue
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:       # rotten orange
                    queue.append((r, c, 0))  # add with minute 0
                elif grid[r][c] == 1:     # fresh orange
                    fresh_count += 1
                    
        # Directions for up, down, left, right
        directions = [(1,0), (-1,0), (0,1), (0,-1)]
        minutes_passed = 0  # Track the number of minutes elapsed

        # Process the queue using BFS
        while queue:
            r, c, minute = queue.popleft()
            minutes_passed = max(minutes_passed, minute)
            
            # Check adjacent cells
            for dr, dc in directions:
                nr, nc = r + dr, c + dc  # new row and column
                # If the adjacent cell is within the grid and has a fresh orange
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2  # make the orange rotten
                    fresh_count -= 1
                    queue.append((nr, nc, minute + 1))
        
        # If no fresh oranges left, return minutes passed; otherwise, return -1
        return minutes_passed if fresh_count == 0 else -1
