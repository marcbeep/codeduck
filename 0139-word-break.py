class Trie:
    def __init__(self):
        self.root = (T := lambda: defaultdict(T))()

    def insert(self, word):
        node = self.root
        for c in word:
            node = node[c]
        node[0] = True

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        trie = Trie()
        for word in wordDict:
            trie.insert(word)
        
        memo = {}

        def search(index, curr):
            if index in memo:
                return memo[index]
            if index == len(s):
                return True
            
            node = curr
            backup = False
            
            for i in range(index, len(s)):
                char = s[i]
                node = node.get(char)
                if not node:
                    memo[index] = False
                    return False
                
                if 0 in node:
                    if search(i + 1, trie.root):
                        memo[index] = True
                        return True

            memo[index] = False
            return False

        return search(0, trie.root)

