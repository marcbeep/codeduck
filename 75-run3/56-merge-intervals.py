from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals:
            return []
        
        intervals.sort(key=lambda x: x[0])
        
        prevInterval = intervals[0]
        results = []
        
        for i in range(1, len(intervals)):
            if prevInterval[1] >= intervals[i][0]:
                prevInterval = [prevInterval[0], max(prevInterval[1], intervals[i][1])]
            else:
                results.append(prevInterval)
                prevInterval = intervals[i]
        
        results.append(prevInterval)
        
        return results
