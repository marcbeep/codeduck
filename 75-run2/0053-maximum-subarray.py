class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        highest = nums[0]
        curr = nums[0]

        for i in nums[1:]:
            curr = max(curr+i, i)
            highest = max(highest, curr)
        
        return highest
