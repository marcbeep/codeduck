class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""
    
        start, end = 0, 0

        def expand_around_center(left: int, right: int):
            nonlocal start, end
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            # Update the longest palindrome found
            if right - left - 1 > end - start:
                start, end = left + 1, right - 1

        for i in range(len(s)):
            expand_around_center(i, i)       # Odd length palindrome
            expand_around_center(i, i + 1)   # Even length palindrome
    
        return s[start:end + 1]
