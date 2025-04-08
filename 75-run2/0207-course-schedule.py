from typing import List

class Node:
    def __init__(self, value):
        self.value = value
        self.neighbours = []

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Step 1: Create a graph representation using adjacency list
        graph = {i: Node(i) for i in range(numCourses)}
        
        # Step 2: Build the graph
        for a, b in prerequisites:
            graph[b].neighbours.append(graph[a])  # Note: reversed direction from your original
        
        visited = [0] * numCourses  # 0 = unvisited, 1 = visiting, 2 = visited
        
        def has_cycle(node):
            if visited[node.value] == 1:
                return True
            if visited[node.value] == 2:
                return False
                
            visited[node.value] = 1  # Mark as visiting
            for neighbour in node.neighbours:
                if has_cycle(neighbour):
                    return True
            visited[node.value] = 2  # Mark as visited
            return False
        
        # Step 3: Check each node for cycles
        for node in graph.values():
            if has_cycle(node):
                return False
                
        return True
