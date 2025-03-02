from typing import List

class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])  # Get the number of rows and columns

        # Start from bottom-right corner and move backwards
        for row in range(m - 1, -1, -1):
            for col in range(n - 1, -1, -1):
                if row == m - 1 and col == n - 1:
                    continue  # Bottom-right cell remains the same
                
                # Calculate the minimum sum from the right and bottom cells
                right_child = grid[row][col + 1] if col + 1 < n else float('inf')
                bottom_child = grid[row + 1][col] if row + 1 < m else float('inf')
                
                # If not in the last row/column, update the current cell
                grid[row][col] += min(right_child, bottom_child)

        return grid[0][0]
