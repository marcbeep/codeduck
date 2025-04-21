class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        if endWord not in wordList:
            return 0

        wordList = set(wordList)  # Convert to set for O(1) lookup
        queue = deque([(beginWord, 1)])
        visited = set([beginWord])

        while queue:
            word, length = queue.popleft()
            if word == endWord:
                return length

            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':  # Change one letter at a time
                    new_word = word[:i] + c + word[i + 1:]
                    if new_word in wordList and new_word not in visited:
                        visited.add(new_word)
                        queue.append((new_word, length + 1))

        return 0  # No path found

