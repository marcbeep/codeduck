from collections import deque
from typing import List

class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        
        def get_position(square: int):
            """Convert a square number into board indices (row, col)."""
            row = (square - 1) // n
            col = (square - 1) % n
            if row % 2 == 1:  # Reverse row order in zigzag
                col = n - 1 - col
            return n - 1 - row, col
        
        queue = deque([(1, 0)])  # (square, moves)
        visited = set()
        
        while queue:
            square, moves = queue.popleft()
            if square == n * n:
                return moves
            
            for i in range(1, 7):  # Rolling dice
                next_square = square + i
                if next_square > n * n:
                    break
                
                r, c = get_position(next_square)
                if board[r][c] != -1:
                    next_square = board[r][c]  # Move to snake/ladder destination
                
                if next_square not in visited:
                    visited.add(next_square)
                    queue.append((next_square, moves + 1))
        
        return -1  # If unreachable

