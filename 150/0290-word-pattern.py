class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        dick = {}
        words = s.split(' ')
        if len(pattern) != len(words):
            return False
        
        for i in range(len(pattern)):
            if pattern[i] in dick:
                if dick[pattern[i]] != words[i]:
                    return False
            else:
                if words[i] in dick.values():
                    return False
                dick[pattern[i]] = words[i]
        return True
