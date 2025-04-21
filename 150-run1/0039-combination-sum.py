class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        output = []
        def backtrack(acc):
            if sum(acc) == target:
                output.append(acc)
                return
            
            for i in candidates:
                if sum(acc) + i <= target and (acc[-1] if acc else 0) <= i:
                    backtrack(acc + [i])
            
        backtrack([])
        return output
