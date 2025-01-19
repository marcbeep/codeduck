class Solution:
    def romanToInt(self, s: str) -> int:
        nums = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}
        i = 0
        total = 0
        while i < len(s):
            current = nums[s[i]]
            while i < len(s)-1 and s[i+1] == s[i]:
                i += 1
                current += nums[s[i]]

            if i < len(s)-1 and nums[s[i]] < nums[s[i+1]]:
                current = nums[s[i+1]] - current
                i += 1
            
            total += current
            i += 1
        
        return total
