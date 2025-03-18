class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        output = []

        def kys(idx, acc):
            if idx >= len(candidates):
                return
            if sum(acc) == target:
                output.append(acc)
                return
            if sum(acc) > target:
                return

            kys(idx, acc+[candidates[idx]])
            kys(idx+1, acc)

        kys(0, [])
        return output
