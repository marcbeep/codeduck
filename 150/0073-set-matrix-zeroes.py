class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # First pass: Mark cells with 0 as '*'
        for row in range(len(matrix)):
            for col in range(len(matrix[0])):
                if matrix[row][col] == 0:
                    # Mark the entire row
                    for i in range(len(matrix[0])):
                        if matrix[row][i] != 0:  # Avoid overwriting 0s
                            matrix[row][i] = "*"
                    # Mark the entire column
                    for i in range(len(matrix)):
                        if matrix[i][col] != 0:  # Avoid overwriting 0s
                            matrix[i][col] = "*"

        # Second pass: Replace '*' with 0
        for row in range(len(matrix)):
            for col in range(len(matrix[0])):
                if matrix[row][col] == "*":
                    matrix[row][col] = 0
