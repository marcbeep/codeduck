class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        dick = {}

        for i in range(len(s)):
            if s[i] in dick:
                if dick[s[i]] != t[i]:
                    return False
            else:
                if t[i] in dick.values():
                    return False
                dick[s[i]] = t[i]
        
        return True
