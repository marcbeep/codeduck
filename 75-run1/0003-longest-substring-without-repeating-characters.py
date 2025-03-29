class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        danielSmells = set()
        left         = 0
        longest      = 0

        if not s:
            return 0

        for right in range(len(s)):
            while s[right] in danielSmells:
                danielSmells.remove(s[left])
                left += 1
            longest = max(longest, right - left)
            danielSmells.add(s[right])

        return longest + 1
