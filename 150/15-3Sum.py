class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Sort the array to enable the two-pointer approach and handle duplicates
        nums.sort()
        result = []
        
        for i in range(len(nums) - 2):
            # Skip duplicates for the first element
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            
            # Set up two pointers
            left, right = i + 1, len(nums) - 1
            
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                
                if total == 0:
                    # Found a triplet, add to the result
                    result.append([nums[i], nums[left], nums[right]])
                    
                    # Move both pointers while skipping duplicates
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    
                    # Move pointers after handling duplicates
                    left += 1
                    right -= 1
                
                elif total < 0:
                    # If the sum is too small, move the left pointer to increase the sum
                    left += 1
                else:
                    # If the sum is too large, move the right pointer to decrease the sum
                    right -= 1
        
        return result
