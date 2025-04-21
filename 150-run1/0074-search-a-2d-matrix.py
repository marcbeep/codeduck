class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        rows = len(matrix)
        cols = len(matrix[0])

        def get_index(idx):
            row = idx // cols
            col = idx % cols
            return matrix[row][col]
        
        left = 0
        right = (rows * cols)-1
        while left <= right:
            mid = left + (right - left)
            if get_index(mid) == target:
                return True
            elif get_index(mid) < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return False
