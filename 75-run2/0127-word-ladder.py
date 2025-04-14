from collections import deque
from typing import List

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordSet = set(wordList)
        # print(f"WordSet: {wordSet}")

        if endWord not in wordSet:
            return 0
        
        queue = deque([(beginWord, 1)]) # each item: (currentWord, steps)
        # print(f"Queue (initial): {queue}")
        visited = set()
        # print(f"Visited (initial): {visited}")

        while queue:
            word, steps = queue.popleft()

            # print(f"Queue at step {steps}: {queue}")
            # print(f"Visited at step {steps}: {visited}")

            if word == endWord:
                return steps

            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = word[:i] + c + word[i+1:] # this swaps it!
                    if next_word in wordSet and next_word not in visited:
                        queue.append((next_word, steps+1))
                        visited.add(next_word)
        
        return 0
