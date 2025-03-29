from collections import deque

class Solution:
    def findMinHeightTrees(self, n: int, edges: list[list[int]]) -> list[int]:
        if n == 1:
            return [0]

        adj = {i: set() for i in range(n)}
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)

        leaves = deque([i for i in range(n) if len(adj[i]) == 1])

        remaining_nodes = n
        while remaining_nodes > 2:
            leaf_count = len(leaves)
            remaining_nodes -= leaf_count

            for _ in range(leaf_count):
                leaf = leaves.popleft()
                neighbor = adj[leaf].pop()
                adj[neighbor].remove(leaf)

                if len(adj[neighbor]) == 1:
                    leaves.append(neighbor)

        return list(leaves)
