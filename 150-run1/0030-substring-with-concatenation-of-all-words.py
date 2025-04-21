class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not words:
            return []
        
        wordLen   = len(words[0])
        wordCount = len(words)
        totalLen  = wordLen * wordCount
        wordMap   = Counter(words)
        result    = []
        
        for i in range(wordLen):
            left  = i
            right = i
            currentMap = Counter()
            
            while right + wordLen <= len(s):
                word = s[right:right + wordLen]
                right += wordLen
                
                if word in wordMap:
                    currentMap[word] += 1
                    
                    while currentMap[word] > wordMap[word]:
                        currentMap[s[left:left + wordLen]] -= 1
                        left += wordLen
                    
                    if right - left == totalLen:
                        result.append(left)
                else:
                    left = right
                    currentMap.clear()
        
        return result
