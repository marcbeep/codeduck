# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        return(self.recursive(root, targetSum, 0))
    
    def recursive(self, root: Optional[TreeNode], targetSum: int, currSum: int) -> bool:
        if not root:
            return False

        currSum += root.val

        if not root.left and not root.right:
            if currSum == targetSum:
                return True
            else:
                return False

        return self.recursive(root.left, targetSum, currSum) or self.recursive(root.right, targetSum, currSum)
