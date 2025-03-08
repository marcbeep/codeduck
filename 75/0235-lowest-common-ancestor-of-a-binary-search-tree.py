# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':

        def bsearch(root, p, q, depth):

            if root == None:
                return root
            
            if root.val == p.val or root.val == q.val:
                return root

            left = bsearch(root.left, p, q, depth+1)
            right = bsearch(root.right, p, q, depth+1)

            if left and right:
                return root
            elif not left:
                return right
            elif not right:
                return left

        return bsearch(root, p, q, 0)
