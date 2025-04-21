from collections import deque
from typing import List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            
            for i in range(level_size):
                node = queue.popleft()

                # The rightmost node in each level (last element in level)
                if i == level_size - 1:
                    result.append(node.val)

                # Enqueue left first, then right (order is important)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return result
