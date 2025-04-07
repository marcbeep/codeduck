class Solution:
    def longestPalindrome(self, s: str) -> int:
        c = Counter(s)
        size = 0
        highest = 0
        for key in c:
            if c[key] % 2 == 0:
                size += c[key]
            else:
                size += c[key]-1
                if c[key] > highest:
                    highest = c[key]
        
        if highest != 0:
            return size - (highest-1) + highest
        else:
            return size
