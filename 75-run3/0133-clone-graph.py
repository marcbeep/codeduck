from typing import Optional
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        old_nodes = {}
        def dfs(root, visited=set()):
            if root in visited:
                return
            
            old_nodes[root] = Node(val=root.val)

            visited.add(root)
            for neighbor in root.neighbors:
                dfs(neighbor, visited)

        dfs(node)

        for old_node in old_nodes:
            old_nodes[old_node].neighbors = [old_nodes[old_neighbor] for old_neighbor in old_node.neighbors]
        
        return old_nodes[node]
