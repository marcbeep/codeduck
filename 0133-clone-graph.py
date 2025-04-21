from typing import Optional
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None
            
        pairs = {}
        def traverse(root, visited=set()):
            if root in visited:
                return
            visited.add(root)
            pairs[root] = Node(val=root.val)
            for n in root.neighbors:
                traverse(n, visited)
        
        traverse(node)
        
        for oldnode in pairs:
            pairs[oldnode].neighbors = [pairs[node] for node in oldnode.neighbors]
        
        return pairs[node]
