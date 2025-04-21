class Trie:
    def __init__(self):
        self.layer = {}

    def insert(self, word: str) -> None:
        curr = self.layer
        for c in word:
            if c not in curr:
                curr[c] = {}
            curr = curr[c]
        curr[0] = True

    def search(self, word: str) -> bool:
        curr = self.layer
        for c in word:
            if c not in curr:
                return False
            curr = curr[c]
        if 0 in curr:
            return True
        else:
            return False

    def startsWith(self, prefix: str) -> bool:
        curr = self.layer
        for c in prefix:
            if c not in curr:
                return False
            curr = curr[c]
        return True
