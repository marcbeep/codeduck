class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.
        
        :type root: TreeNode
        :rtype: str
        """
        output = ""
        queue = [root]
        while queue:
            curr = queue.pop(0)
            if curr:
                output += str(curr.val) + ','
                queue.append(curr.left)
                queue.append(curr.right)
            else:
                output += "None,"
        
        return output

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        
        :type data: str
        :rtype: TreeNode
        """
        nodes = data.split(',')
        if not nodes or nodes[0] == "None":
            return None
        
        curr = nodes.pop(0)
        root = TreeNode(int(curr))
        queue = [root]
        while queue:
            curr = queue.pop(0)
            if nodes:
                left = nodes.pop(0)
                if left != "None":
                    curr.left = TreeNode(int(left))
                    queue.append(curr.left)
            if nodes:
                right = nodes.pop(0)
                if right != "None":
                    curr.right = TreeNode(int(right))
                    queue.append(curr.right)
        
        return root
