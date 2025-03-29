class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True
        
        def get_min(root):
            if not root:
                return float('inf')
            return min(root.val, get_min(root.left), get_min(root.right))

        def get_max(root):
            if not root:
                return float('-inf')
            return max(root.val, get_max(root.left), get_max(root.right))

        left_max = get_max(root.left)
        right_min = get_min(root.right)

        if left_max >= root.val or root.val >= right_min:
            return False

        return self.isValidBST(root.left) and self.isValidBST(root.right)
