from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        islands = 0

        def nuke(grid, x, y):
            if x < 0 or x >= len(grid) or y < 0 or y >= len(grid[0]):
                return
            if grid[x][y] == '0':
                return

            grid[x][y] = '0'

            nuke(grid, x+1, y)
            nuke(grid, x-1, y)
            nuke(grid, x, y+1)
            nuke(grid, x, y-1)

        for x in range(len(grid)):  
            for y in range(len(grid[0])):  
                if grid[x][y] == "1":  
                    nuke(grid, x, y)  
                    islands += 1  

        return islands
