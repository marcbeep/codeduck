class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        
        # Pointer for the position of the next valid element
        j = 1  # Start from the second position
        count = 1  # To count occurrences of the current number

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                count += 1
            else:
                count = 1  # Reset the count for a new number
            
            # Allow the number to be placed in the array if it appears at most twice
            if count <= 2:
                nums[j] = nums[i]
                j += 1
        
        return j

