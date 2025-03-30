class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        target = image[sr][sc]
        visited = set()
        def dfs(x, y):
            visited.add((x, y))
            if x < 0 or y < 0 or x > len(image)-1 or y > len(image[x])-1 or image[x][y] != target:
                return
            
            for coords in [(x-1, y), (x+1, y), (x, y-1), (x, y+1)]:
                if coords not in visited:
                    dfs(*coords)

            image[x][y] = color
            return
        
        dfs(sr, sc)
        return image
