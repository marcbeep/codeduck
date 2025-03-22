# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        """
        use array , init each index to depth
        traverse tree dfs left to right
        at index, store every value (rightmost will overwrite)
        """

        def height(root):
            if not root:
                return 0
            return 1 + max(height(root.left), height(root.right))
        
        depth = height(root)
        rsv = [0] * depth

        def inorder(root, depth):
            if root:
                inorder(root.left, depth+1)
                rsv[depth] = root.val
                inorder(root.right, depth+1)

        inorder(root, 0)

        return rsv
