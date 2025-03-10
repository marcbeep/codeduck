class Solution:
    def longestPalindrome(self, s: str) -> int:
        freq = Counter(s)
        count = 0
        there_is_odd = False
        for val in freq.values():
            if val % 2 != 0:
                there_is_odd = True
            count += (val//2)*2
        
        return count+1 if there_is_odd else count
