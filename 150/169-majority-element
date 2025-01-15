class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = None
        count = 0
        
        # Phase 1: Find a candidate
        for num in nums:
            if count == 0:
                candidate = num
            count += (1 if num == candidate else -1)
        
        # Phase 2: Optional validation
        # In this specific problem, we are told the majority element always exists, 
        # so validation is not necessary.
        
        return candidate
