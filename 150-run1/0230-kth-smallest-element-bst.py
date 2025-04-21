# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:

        results =[] 

        def inorder(node):
            if node is None:
                return

            # First recur on left subtree
            inorder(node.left)

            # Now deal with the node
            results.append(node.val)

            # Then recur on right subtree
            inorder(node.right)

        inorder(root)
        print(results)
        return results[k-1]
