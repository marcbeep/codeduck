class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        for c in s:
            while i < len(t):
                if t[i] == c:
                    i += 1
                    break
                i += 1
            else:
                return False
        
        return True
