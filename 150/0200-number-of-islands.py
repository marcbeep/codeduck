class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:

        self.islands = 0

        def dfs(grid, i, j):
            if i < 0 or j < 0 or i >=len(grid) or j>=len(grid[i]) or grid[i][j] != '1': return 
            grid[i][j] = '0'
            dfs(grid, i-1, j) # top
            dfs(grid, i+1, j) # bottom
            dfs(grid, i, j-1) # left
            dfs(grid, i, j+1) # right

        # go through every element, if 1, do dfs
        for i in range(len(grid)):
            for j in range(len(grid[i])):
                print(grid[i][j], end = " ")

                if grid[i][j] == '1':
                    self.islands += 1
                    dfs(grid, i, j)

        return self.islands
