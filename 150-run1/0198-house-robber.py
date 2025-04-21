class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        
        prev1, prev2 = 0, 0
        
        for num in nums:
            new_profit = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = new_profit
        
        return prev1

