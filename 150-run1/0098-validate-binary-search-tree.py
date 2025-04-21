class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def findmin(root):
            if not root:
                return float('inf')
            return min(root.val, findmin(root.left), findmin(root.right))
        def findmax(root):
            if not root:
                return float('-inf')
            return max(root.val, findmax(root.left), findmax(root.right))
        
        if not root:
            return True
        if findmax(root.left) >= root.val:
            return False
        if findmin(root.right) <= root.val:
            return False
        
        return self.isValidBST(root.left) and self.isValidBST(root.right)

