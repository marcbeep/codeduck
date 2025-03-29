class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None
        
        queue = deque([node])
        nodes = {node: Node(node.val)}
        
        while queue:
            current = queue.popleft()
            for neighbor in current.neighbors:
                if neighbor not in nodes:
                    nodes[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                nodes[current].neighbors.append(nodes[neighbor])
        
        return nodes[node]

