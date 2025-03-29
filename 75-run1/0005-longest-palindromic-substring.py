class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s:
            return ""

        bestStart, bestLength = 0, 0

        def expand(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return left + 1, right - 1

        for i in range(len(s)):
            left1, right1 = expand(i, i)
            left2, right2 = expand(i, i + 1)

            if right1 - left1 > bestLength:
                bestStart, bestLength = left1, right1 - left1
            if right2 - left2 > bestLength:
                bestStart, bestLength = left2, right2 - left2

        return s[bestStart : bestStart + bestLength + 1]
