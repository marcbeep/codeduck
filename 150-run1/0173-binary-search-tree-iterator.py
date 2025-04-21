class BSTIterator:
    def __init__(self, root):
        self.stack = []
        self._leftmost_inorder(root)

    def _leftmost_inorder(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self):
        top_node = self.stack.pop()
        
        if top_node.right:
            self._leftmost_inorder(top_node.right)
        
        return top_node.val

    def hasNext(self):
        return len(self.stack) > 0
