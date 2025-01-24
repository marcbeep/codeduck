class Solution:
    def minWindow(self, s: str, t: str) -> str:
        dick = defaultdict(int)
        for c in t:
            dick[c] += 1

        minstring = ""
        minlen = float('inf')
        left = 0
        for right, c in enumerate(s):
            if c in dick:
                dick[c] -= 1

            while all(val <= 0 for val in dick.values()):
                if right - left < minlen:
                    minlen = right - left
                    minstring = s[left:right+1]
                if s[left] in dick:
                    dick[s[left]] += 1
                left += 1
        
        return minstring

