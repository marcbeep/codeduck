class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = ''.join(filter(lambda character: character.isalnum(), s)).lower()
        return s[::-1]==s
