class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        dick = defaultdict(int)
        for c in magazine:
            dick[c] += 1
        
        for c in ransomNote:
            dick[c] -= 1
        
        return all(value >= 0 for value in dick.values())
