class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        
        rows = len(matrix)
        cols = len(matrix[0])
        dp = [[0] * cols for _ in range(rows)]  # DP table
        max_square_size = 0  # Track the largest square size

        # Iterate through the matrix
        for i in range(rows):
            for j in range(cols):
                if matrix[i][j] == "1":  # Only process cells with '1'
                    if i == 0 or j == 0:
                        dp[i][j] = 1  # Base case: If it's the first row/col, it can only be 1
                    else:
                        dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                    
                    max_square_size = max(max_square_size, dp[i][j])

        # Print DP table for visualization
        print("\nDP Table:")
        for row in dp:
            print(row)

        return max_square_size ** 2  # Return the area of the largest square
