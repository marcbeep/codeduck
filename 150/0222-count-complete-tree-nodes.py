class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countNodes(self, root: TreeNode) -> int:
        if not root:
            return 0
        
        # Compute the depth of the leftmost path
        def getDepth(node):
            depth = 0
            while node:
                depth += 1
                node = node.left
            return depth

        leftDepth = getDepth(root.left)
        rightDepth = getDepth(root.right)

        if leftDepth == rightDepth:
            # Left subtree is a full tree, count it directly
            return (1 << leftDepth) + self.countNodes(root.right)
        else:
            # Right subtree is a full tree (one level smaller)
            return (1 << rightDepth) + self.countNodes(root.left)
