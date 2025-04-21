class Solution:
    def canJump(self, nums: List[int]) -> bool:
        goal = len(nums) - 1  # Start with the last index as the goal
        for i in range(len(nums) - 2, -1, -1):  # Iterate backward
            if i + nums[i] >= goal:  # Can this index reach the goal?
                goal = i  # Update the goal to this index
        return goal == 0  # Check if we can reach the start
