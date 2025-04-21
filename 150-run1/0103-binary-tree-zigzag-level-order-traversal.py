class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        q = deque([root])
        results = []
        isOdd = False  # False -> LTR, True -> RTL

        while q:
            depthSize = len(q)
            levelNodes = []
            nextQ = deque()

            for _ in range(depthSize):
                node = q.popleft()
                levelNodes.append(node.val)
                if node.left:
                    nextQ.append(node.left)
                if node.right:
                    nextQ.append(node.right)

            if isOdd:
                levelNodes.reverse()
            
            results.append(levelNodes)
            q = nextQ  # Move to the next level
            isOdd = not isOdd  # Toggle direction
        
        return results
