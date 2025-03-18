class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(path, used):
            if len(path) == len(nums):
                result.append(path[:]) # valid permutation
                return 
            
            for i in range(len(nums)):
                if used[i]:
                    continue # we don't need to try used elements so skip
                used[i] = True
                path.append(nums[i])
                backtrack(path, used) 
                path.pop() # undo choice
                used[i] = False

        backtrack([], [False]*len(nums))
        return result
