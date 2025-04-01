# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return
        
        rootVal    = preorder.pop(0)
        root       = TreeNode(rootVal)
        rootI      = inorder.index(rootVal)
        root.left  = self.buildTree(preorder,  inorder[:rootI])
        root.right = self.buildTree(preorder, inorder[rootI + 1:])

        return root
