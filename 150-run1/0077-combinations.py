class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        def backtrack(start, curr):
            if len(curr) == k:
                return [curr]
            
            output = []
            for e in range(start, n + 1):
                output.extend(backtrack(e + 1, curr + [e]))
            
            return output
        
        return backtrack(1, [])

