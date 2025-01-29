class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        if not nums:
            return []

        ranges = [[nums[0]]]
        i = 1
        while i < len(nums):
            if nums[i-1] != nums[i]-1:
                ranges.append([])
            ranges[-1].append(nums[i])
            i += 1
        
        output = []
        for rang in ranges:
            if len(rang) > 1:
                output.append(f'{rang[0]}->{rang[-1]}')
            else:
                output.append(f'{rang[0]}')

        return output
