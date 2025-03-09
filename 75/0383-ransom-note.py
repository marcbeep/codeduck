class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        frequency_dict = defaultdict(int)

        for char in magazine:
            frequency_dict[char] += 1
        
        for char in ransomNote:
            frequency_dict[char] -= 1
            if frequency_dict[char] < 0:
                return False

        return True
