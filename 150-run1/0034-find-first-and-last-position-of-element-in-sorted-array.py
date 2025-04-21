from typing import List

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def findFirst(nums, target):
            left, right = 0, len(nums) - 1
            first = -1
            while left <= right:
                mid = left + (right - left) // 2
                if nums[mid] == target:
                    first = mid
                    right = mid - 1  # Keep searching on the left side
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return first
        
        def findLast(nums, target):
            left, right = 0, len(nums) - 1
            last = -1
            while left <= right:
                mid = left + (right - left) // 2
                if nums[mid] == target:
                    last = mid
                    left = mid + 1  # Keep searching on the right side
                elif nums[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return last
        
        first = findFirst(nums, target)
        last = findLast(nums, target)
        
        return [first, last]
