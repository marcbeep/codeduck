class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        def dfs(x, y):
            if x < 0 or x > len(grid)-1 or y < 0 or y > len(grid[0])-1:
                return 
            
            if grid[x][y] == '1':
                grid[x][y] = '0'
                dfs(x+1, y)
                dfs(x-1, y)
                dfs(x, y+1)
                dfs(x, y-1)
            
            return
        
        count = 0

        for i in range(len(grid)):
            for j in range(len(grid[0])):
                print(grid[i][j])
                if grid[i][j] == '1':
                    count += 1
                dfs(i, j)

        return count
