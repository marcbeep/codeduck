# iterative:
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        # Edge cases
        if numRows == 1 or numRows >= len(s):
            return s
        
        # Initialize rows
        rows = [''] * numRows
        current_row = 0
        direction = 1  # 1 for down, -1 for up
        
        # Iterate through each character
        for char in s:
            rows[current_row] += char
            # Check direction changes at the boundaries
            if current_row == 0:
                direction = 1
            elif current_row == numRows - 1:
                direction = -1
            current_row += direction
        
        # Combine all rows to form the result
        return ''.join(rows)
