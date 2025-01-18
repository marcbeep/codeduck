from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [1] * n  # Initialize the result array with 1

        # Compute prefix products
        prefix = 1
        for i in range(n):
            answer[i] = prefix
            prefix *= nums[i]

        # Compute suffix products and multiply with prefix
        suffix = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]

        return answer
