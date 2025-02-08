class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return sum(int(num) for num in self.helper(root))

    def helper(self, root):
        if not root:
            return []
        if not root.left and not root.right:
            return [str(root.val)]

        left_paths = self.helper(root.left)
        right_paths = self.helper(root.right)
        
        return [str(root.val) + path for path in left_paths + right_paths]
