class Solution:
    def permute(self, nums):
        def backtrack(start):
            if start == len(nums):
                result.append(nums[:])  # Make a copy of the current permutation
                return
            for i in range(start, len(nums)):
                nums[start], nums[i] = nums[i], nums[start]  # Swap
                backtrack(start + 1)
                nums[start], nums[i] = nums[i], nums[start]  # Backtrack (undo swap)

        result = []
        backtrack(0)
        return result

# Example Usage
sol = Solution()
print(sol.permute([1, 2, 3]))  # Expected output: All permutations of [1,2,3]
