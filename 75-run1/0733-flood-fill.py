class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        rows, cols = len(image), len(image[0])
        original_color = image[sr][sc]
        
        if original_color == color:
            return image  

        def check(x, y):
            if x < 0 or y < 0 or x >= rows or y >= cols or image[x][y] != original_color:
                return  
            
            image[x][y] = color  

            check(x - 1, y)
            check(x + 1, y)
            check(x, y - 1)
            check(x, y + 1)

        check(sr, sc)
        return image
