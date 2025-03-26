class Solution:
    def minWindow(self, s: str, t: str) -> str:
        need, window = {}, {}
        left, right = 0, 0
        length = float('inf')
        start = 0
        valid = 0
        
        for char in t:
            need[char] = need.get(char, 0) + 1
        
        while right < len(s):
            c = s[right]
            right += 1
            if c in need:
                window[c] = window.get(c, 0) + 1
                if window[c] == need[c]:
                    valid += 1


            while left < right and valid == len(need):
                if right - left < length:
                    length = right - left
                    start = left
                d = s[left]
                if d in need:
                    if window[d] == need[d]:
                        valid -= 1
                    window[d] -= 1
                left += 1

        return "" if length == float('inf') else s[start: start + length]
