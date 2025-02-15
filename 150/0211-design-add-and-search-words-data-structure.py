class WordDictionary:
    def __init__(self):
        self.dick = {}      
        self.isWord = False 

    def addWord(self, word: str) -> None:
        node = self  
        for c in word:
            if c not in node.dick:
                node.dick[c] = WordDictionary() 
            node = node.dick[c] 
        node.isWord = True      

    def search(self, word: str) -> bool:
        node = self  
        for i, c in enumerate(word):
            if c == ".":
                for child in node.dick.values(): 
                    if child.search(word[i + 1:]):
                        return True
                return False  
            elif c not in node.dick:
                return False   
            node = node.dick[c]
        
        return node.isWord
