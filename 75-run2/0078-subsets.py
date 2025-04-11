class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        output = []
        def backtrack(acc, index):
            if index >= len(nums):
                output.append(acc)
                return
            
            backtrack(acc, index+1)
            backtrack(acc + [nums[index]], index+1)

        backtrack([], 0)
        return output
