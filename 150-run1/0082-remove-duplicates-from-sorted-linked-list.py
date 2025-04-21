from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Dummy node initialisation
        dummy = ListNode(0)
        dummy.next = head
        
        prev = dummy  # 'prev' is the last node before the sublist of duplicates
        curr = head
        
        while curr:
            # If current node has a duplicate
            if curr.next and curr.val == curr.next.val:
                duplicate_val = curr.val
                # Skip all nodes with the duplicate value
                while curr and curr.val == duplicate_val:
                    curr = curr.next
                # Link previous node to the first node with a new value
                prev.next = curr
            else:
                # No duplicate, move prev pointer to current
                prev = curr
                curr = curr.next
        
        return dummy.next
