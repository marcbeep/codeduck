class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dick = {}

        for i, num in enumerate(nums):
            complement = target - num
            if complement in dick:
                return [dick[complement], i]
            dick[num] = i
        
        return []
