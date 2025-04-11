class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        heap = []
        
        def sqEuDis(x, y):
            return (x**2)+(y**2)
        
        for i in range(len(points)):
            heap.append([sqEuDis(points[i][0], points[i][1]), points[i]])
            
        heapq.heapify(heap)
        
        return [heapq.heappop(heap)[1] for i in range(k)]
