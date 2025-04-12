from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # we'll store the number as the key and the index as the value
        seen = {}

        for i, num in enumerate(nums):
            complement = target - num
            # Check if complement exists in seen
            if complement in seen:
                return [seen[complement], i]
            # Store current number and its index
            seen[num] = i

        # If no solution found, return empty list
        return []
