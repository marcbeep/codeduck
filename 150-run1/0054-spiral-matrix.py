class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return []  # Handle edge case for empty matrix
        
        acc = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        
        while top <= bottom and left <= right:
            # Traverse from left to right on the current top row
            for i in range(left, right + 1):
                acc.append(matrix[top][i])
            top += 1  # Move the top boundary down
            
            # Traverse from top to bottom on the current right column
            for i in range(top, bottom + 1):
                acc.append(matrix[i][right])
            right -= 1  # Move the right boundary left
            
            # Traverse from right to left on the current bottom row
            if top <= bottom:
                for i in range(right, left - 1, -1):
                    acc.append(matrix[bottom][i])
                bottom -= 1  # Move the bottom boundary up
            
            # Traverse from bottom to top on the current left column
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    acc.append(matrix[i][left])
                left += 1  # Move the left boundary right
        
        return acc

