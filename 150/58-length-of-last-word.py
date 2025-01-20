class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len([w for w in s.split(' ') if w][-1])
