class Solution:
    def isAnagram(self, s: str, t: str) -> bool:

        if len(s) != len(t):
            return False 
        
        dick1 = defaultdict(int)
        dick2 = defaultdict(int)

        for i in range(len(s)):
            dick1[s[i]] += 1 
            dick2[t[i]] += 1 
        
        if dick1 == dick2:
            return True
        else:
            return False
