class Solution:
    def majorityElement(self, nums: List[int]) -> int:

        dictionary = defaultdict(int)
        threshold = len(nums) // 2

        for i in range(len(nums)):
                dictionary[nums[i]] += 1
                if dictionary[nums[i]] > threshold:
                    return nums[i]

        return 0
