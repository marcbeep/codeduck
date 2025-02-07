class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if not root:
            return
        
        if root.left and not root.right:
            root.right = root.left
            root.left = None

        
        if root.left:
            tmp = root.right
            root.right = root.left
            root.left = None

            curr = root.right
            while curr.right:
                curr = curr.right
            curr.right = tmp
    
        self.flatten(root.right)
