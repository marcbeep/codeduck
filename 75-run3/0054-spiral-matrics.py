class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return []

        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        outy = []

        while top <= bottom and left <= right:
            # top row
            for i in range(left, right + 1):
                outy.append(matrix[top][i])
            top += 1

            # right column
            for i in range(top, bottom + 1):
                outy.append(matrix[i][right])
            right -= 1

            if top <= bottom:
                # bottom row
                for i in range(right, left - 1, -1):
                    outy.append(matrix[bottom][i])
                bottom -= 1

            if left <= right:
                # left column
                for i in range(bottom, top - 1, -1):
                    outy.append(matrix[i][left])
                left += 1

        return outy
