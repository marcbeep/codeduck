class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        differences = {}
        for i in range(len(nums)):
            if nums[i] not in differences:
                # store difference in key, and index in value
                difference = target - nums[i]
                differences[difference] = i
            else:
                # return the pair [index of difference, current index]
                return [differences[nums[i]], i]
