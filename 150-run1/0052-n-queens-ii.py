class Solution:
    def totalNQueens(self, n: int) -> int:
        def backtrack(row, cols, diag1, diag2):
            # If we've placed queens on all rows, this is a valid solution
            if row == n:
                return 1
            
            count = 0
            for col in range(n):
                # Check if the column or diagonals are already attacked
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue
                
                # Mark the current column and diagonals as attacked
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)
                
                # Recurse to place queens in the next row
                count += backtrack(row + 1, cols, diag1, diag2)
                
                # Backtrack: undo the marks for the current row
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)
            
            return count

        return backtrack(0, set(), set(), set())
