class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        inorder_map = {val: idx for idx, val in enumerate(inorder)}  # HashMap for quick index lookup
        post_idx = [len(postorder) - 1]  # Mutable index for tracking postorder root

        def helper(left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            
            root_val = postorder[post_idx[0]]
            post_idx[0] -= 1
            
            root = TreeNode(root_val)
            root_index = inorder_map[root_val]

            # Build right subtree first (reverse of postorder)
            root.right = helper(root_index + 1, right)
            root.left = helper(left, root_index - 1)
            
            return root
        
        return helper(0, len(inorder) - 1)
