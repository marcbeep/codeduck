class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0  # Already at the last index
        
        jumps = 0
        current_end = 0  # The farthest we can go with the current number of jumps
        farthest = 0  # The farthest we can reach overall
        
        for i in range(n - 1):  # We do not need to consider the last index
            farthest = max(farthest, i + nums[i])  # Update the farthest we can reach
            
            if i == current_end:  # Time to make another jump
                jumps += 1
                current_end = farthest  # Update the range for the next jump
                
                if current_end >= n - 1:  # If we can already reach the last index
                    break
        
        return jumps

