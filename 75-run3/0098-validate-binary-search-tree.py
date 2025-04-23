# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        
        def valid(root, minval=float("-inf"), maxval=float("inf")):
            if not root:
                return True
            
            if not(minval < root.val < maxval):
                return False
            
            return valid(root.left, minval, root.val) and valid(root.right, root.val, maxval)

        return valid(root)
