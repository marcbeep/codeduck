class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        dick = defaultdict(int)
        for chr in s:
            dick[chr] += 1
        
        for chr in t:
            dick[chr] -= 1
        
        return all(0 == dick[chr] for chr in dick.keys())
