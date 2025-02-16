class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None  # Stores complete word at end node

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word  # Mark end of a word

class Solution:
    def findWords(self, board, words):
        # Step 1: Build Trie
        trie = Trie()
        for word in words:
            trie.insert(word)
        
        rows, cols = len(board), len(board[0])
        result = set()
        
        def dfs(node, r, c):
            char = board[r][c]
            if char not in node.children:
                return
            
            next_node = node.children[char]
            if next_node.word:  # Found a complete word
                result.add(next_node.word)
            
            board[r][c] = "#"  # Mark visited
            
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:  # Explore 4 directions
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] in next_node.children:
                    dfs(next_node, nr, nc)
            
            board[r][c] = char  # Restore board
            
            # Optional: Remove leaf nodes for Trie optimization
            if not next_node.children:
                node.children.pop(char)

        # Step 2: Start DFS from every cell
        for r in range(rows):
            for c in range(cols):
                if board[r][c] in trie.root.children:
                    dfs(trie.root, r, c)
        
        return list(result)
