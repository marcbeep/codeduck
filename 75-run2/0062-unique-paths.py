def uniquePaths(m, n):
    # Create a 2D grid with m rows and n columns filled with 1s
    # Each cell represents the number of ways to reach that cell
    grid = [[1] * n for _ in range(m)]

    # Fill the grid starting from cell (1,1)
    for row in range(1, m):
        for col in range(1, n):
            # Number of paths to current cell = paths from top + paths from left
            grid[row][col] = grid[row - 1][col] + grid[row][col - 1]

    # Return the number of paths to the bottom-right corner
    return grid[m - 1][n - 1]
