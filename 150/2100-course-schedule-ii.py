class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = defaultdict(list)
        in_degree = [0] * numCourses
        order = []

        # Build adjacency list and in-degree array
        for course, prereq in prerequisites:
            graph[prereq].append(course)
            in_degree[course] += 1

        # Initialize queue with courses having no prerequisites
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])

        while queue:
            course = queue.popleft()
            order.append(course)

            # Reduce in-degree for dependent courses
            for dependent in graph[course]:
                in_degree[dependent] -= 1
                if in_degree[dependent] == 0:
                    queue.append(dependent)

        return order if len(order) == numCourses else []
