class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        indegree = defaultdict(int)
        dependencies = defaultdict(list)

        for pre, course in prerequisites:
            indegree[course] += 1
            dependencies[pre].append(course)

        queue = [node for node in range(numCourses) if indegree[node] == 0]    
        while queue:
            print(queue)
            for dep in dependencies[queue[0]]:
                indegree[dep] -= 1
                if indegree[dep] == 0:
                    queue.append(dep)
            
            queue.pop(0)
        
        return all(degree == 0 for degree in indegree.values())
