class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        outy = []

        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            p1, p2 = i + 1, len(nums) - 1

            while p1 < p2:
                total = nums[i] + nums[p1] + nums[p2]

                if total == 0:
                    outy.append([nums[i], nums[p1], nums[p2]])
                    p1 += 1
                    p2 -= 1
                    while p1 < p2 and nums[p1] == nums[p1 - 1]:
                        p1 += 1
                    while p1 < p2 and nums[p2] == nums[p2 + 1]:
                        p2 -= 1
                elif total < 0:
                    p1 += 1
                else:
                    p2 -= 1
        
        return outy
