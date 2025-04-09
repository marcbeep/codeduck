class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        output = []

        def backtrack(acc, index):
            if sum(acc) == target:
                output.append(acc)
                return
            if sum(acc) > target or index >= len(candidates):
                return

            backtrack(acc + [candidates[index]], index)
            backtrack(acc, index+1)
        
        backtrack([], 0)
        return output
