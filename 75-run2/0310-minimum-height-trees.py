class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]  # Special case for single node tree
        
        # Step 1: Build adjacency list
        adj = {i: set() for i in range(n)}
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)

        # Step 2: Initialize leaves (nodes with only one neighbor)
        leaves = deque([i for i in range(n) if len(adj[i]) == 1])

        # Step 3: Trim leaves level by level
        remaining_nodes = n
        while remaining_nodes > 2:
            leaf_count = len(leaves)
            remaining_nodes -= leaf_count
            for _ in range(leaf_count):
                leaf = leaves.popleft()
                # Remove the leaf from the graph
                for neighbor in adj[leaf]:
                    adj[neighbor].remove(leaf)
                    if len(adj[neighbor]) == 1:  # Becomes a new leaf
                        leaves.append(neighbor)
                adj.pop(leaf)
        
        # The remaining nodes are the MHT roots
        return list(leaves)
