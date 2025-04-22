class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        heap = []
        def dfs(root):
            if not root:
                return
            
            heapq.heappush(heap, root.val)
            dfs(root.left)
            dfs(root.right)
        
        dfs(root)
        for _ in range(k-1):
            heapq.heappop(heap)
        
        return heapq.heappop(heap)
