class Codec:
    def serialize(self, root):
        output = ""
        queue = [root]
        while queue:
            head = queue.pop(0)
            if head:
                output += str(head.val) + ','
                queue.append(head.left)
                queue.append(head.right)
            else:
                output += 'None,'
        
        return output
        

    def deserialize(self, data):
        def is_int(n):
            try:
                int(n)
                return True
            except:
                return False

        nodes = data.split(',')
        if not nodes or nodes[0] == 'None':
            return None
        
        head = nodes.pop(0)
        root = TreeNode(int(head))
        queue = [root]
        
        while queue:
            head = queue.pop(0)
            if nodes:
                left = nodes.pop(0)
                if left != 'None':
                    head.left = TreeNode(int(left))
                    queue.append(head.left)
            if nodes:
                right = nodes.pop(0)
                if right != 'None':
                    head.right = TreeNode(int(right))
                    queue.append(head.right)

        return root
