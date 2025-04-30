class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxSubSum  = float('-inf')
        currSubSum = float('-inf')

        for i in range(len(nums)):
            currSubSum = max(nums[i], currSubSum + nums[i])
            maxSubSum  = max(maxSubSum, currSubSum)
        
        return maxSubSum
