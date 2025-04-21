class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        dick = {}

        for i in range(len(nums)):
            if nums[i] not in dick:
                dick[nums[i]] = i
            elif (i - dick[nums[i]]) <= k:
                return True
            else:
                dick[nums[i]] = i
        
        return False
