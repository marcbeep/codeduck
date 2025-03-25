# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        ks = []
        heapq.heapify(ks)

        def dfs(root):
            if not root:
                return None
            
            heapq.heappush(ks, root.val)

            dfs(root.left)
            dfs(root.right)
        
        dfs(root)

        for _ in range(k):
            smallest = heapq.heappop(ks)
        
        return smallest
