class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        dick = {}
        for word in strs:
            wordsrt = str(sorted(word))
            if wordsrt not in dick:
                dick[wordsrt] = [word]
            else:
                dick[wordsrt].append(word)

        
        return list(dick.values())
