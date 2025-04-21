"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""

class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None

        # Step 1: Create a deep copy of the nodes, inserting them after the original nodes
        current = head
        while current:
            new_node = Node(current.val)
            new_node.next = current.next
            current.next = new_node
            current = new_node.next
        
        # Step 2: Update the random pointers of the copied nodes
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next
        
        # Step 3: Separate the original list and the copied list
        original = head
        copied_head = head.next
        copied_current = copied_head
        while original:
            original.next = original.next.next
            if copied_current.next:
                copied_current.next = copied_current.next.next
            original = original.next
            copied_current = copied_current.next
        
        return copied_head
