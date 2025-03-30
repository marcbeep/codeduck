class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        acc = 1
        pre_mul = [acc := acc * x for x in nums]
        acc = 1
        pos_mul = list(reversed([acc := acc * x for x in reversed(nums)]))

        output = []
        for idx in range(len(nums)):
            output.append((pre_mul[idx-1] if idx >= 1 else 1) * (pos_mul[idx+1] if idx < len(nums)-1 else 1))
            
        return output
