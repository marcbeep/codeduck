class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        counter = 0
        for letters in zip(*strs):
            if all(letters[0] == x for x in letters):
                counter += 1
            else:
                break
        
        return strs[0][:counter]
