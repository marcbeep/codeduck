class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # get depth
        def depth(root):
            if not root:
                return 0
            return max(depth(root.left), depth(root.right)) + 1

        levels = [[] for _ in range(depth(root))]  # Correctly initialize levels

        def dfs(root, depth):
            if not root:
                return
            
            levels[depth].append(root.val)

            dfs(root.left, depth + 1)
            dfs(root.right, depth + 1)
            
        dfs(root, 0)
        return levels
