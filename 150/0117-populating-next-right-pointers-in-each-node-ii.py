class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None

        dummy = Node(0)
        prev = dummy
        current = root

        while current:
            while current:
                if current.left:
                    prev.next = current.left
                    prev = prev.next
                if current.right:
                    prev.next = current.right
                    prev = prev.next
                current = current.next

            current = dummy.next
            dummy.next = None
            prev = dummy

        return root
