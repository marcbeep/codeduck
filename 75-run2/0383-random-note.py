class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        mCount = Counter(magazine)
        rCount = Counter(ransomNote)

        for char in rCount:
            if mCount[char] < rCount[char]:
                return False
        return True
