class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        pairs = [] 
        for i in range(len(points)):
            eu_dist = (points[i][0])**2 + (points[i][1]**2)
            pairs.append((points[i], eu_dist))

        sorted_pairs = sorted(pairs, key=lambda x:x[1])

        return [lst[0] for lst in sorted_pairs[:k]]
