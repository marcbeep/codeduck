# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []

        layers = []
        current = [root]
        while current:
            layers.append(current)
            current = []
            for node in layers[-1]:
                if node.left:
                    current.append(node.left)
                if node.right:
                    current.append(node.right)
        
        return list(map(lambda x: list(map(lambda y: y.val, x)), layers))
