class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        letters = Counter(s)

        if len(s) != len(t):
            return False
        
        for char in t:
            if char in letters:
                letters[char] -= 1

        return all(count == 0 for count in letters.values())
