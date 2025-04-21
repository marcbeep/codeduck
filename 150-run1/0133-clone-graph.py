class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        visited = {}  # Dictionary to store original -> cloned node mapping
        queue = deque([node])  # Queue for BFS traversal
        
        # Clone the first node and store it in the visited dictionary
        visited[node] = Node(node.val)
        
        while queue:
            original_node = queue.popleft()
            
            for neighbor in original_node.neighbors:
                if neighbor not in visited:
                    # Clone the neighbor and mark it visited
                    visited[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                
                # Connect the cloned node to its cloned neighbors
                visited[original_node].neighbors.append(visited[neighbor])

        return visited[node]
