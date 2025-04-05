class Solution:
    def minWindow(self, s: str, t: str) -> str:
        min_n = float('inf')
        min_s = ''
        i, j = 0, 0
        c_t = Counter(t)
        c_ss = defaultdict(int)
        while j < len(s):
            c_ss[s[j]] += 1

            while all(c_ss[char] >= c_t[char] for char in c_t):
                if min_n > j - i:
                    min_n = j - i
                    min_s = s[i:j+1]
                c_ss[s[i]] -= 1
                i += 1

            j += 1
        
        return min_s
