from typing import Optional

# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.max_sum = float('-inf')

        def dfs(node):
            if not node:
                return 0

            # Get max sum from left and right subtrees (ignore negatives)
            left_max = max(dfs(node.left), 0)
            right_max = max(dfs(node.right), 0)

            # Compute the max path sum passing through the current node
            current_sum = node.val + left_max + right_max

            # Update global max path sum
            self.max_sum = max(self.max_sum, current_sum)

            # Return max sum for a path INCLUDING only one child
            return node.val + max(left_max, right_max)

        dfs(root)
        return self.max_sum
