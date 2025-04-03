class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.diameter = 0

        def height(root):
            if not root:
                return 0
            
            left_h = height(root.left)
            right_h = height(root.right)

            self.diameter = max(self.diameter, left_h + right_h)

            return max(left_h, right_h)+1

        height(root)

        return self.diameter
