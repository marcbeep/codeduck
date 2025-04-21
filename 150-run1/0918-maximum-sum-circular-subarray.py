class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        def kadane(arr):
            max_sum = cur_max = arr[0]
            for num in arr[1:]:
                cur_max = max(num, cur_max + num)
                max_sum = max(max_sum, cur_max)
            return max_sum
        
        max_kadane = kadane(nums)  # Maximum subarray sum in normal array
        total_sum = sum(nums)  # Sum of entire array
        min_kadane = kadane([-num for num in nums])  # Minimum subarray sum
        
        max_wrap = total_sum + min_kadane  # Convert back to max sum
        
        # Handle case where all elements are negative (max_wrap == 0)
        if max_wrap == 0:
            return max_kadane
        
        return max(max_kadane, max_wrap)

