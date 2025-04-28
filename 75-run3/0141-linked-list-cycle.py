# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        
        # Initialse outside of loop to head
        slow = head
        fast = head

        # Loop's main condition 
        while fast and fast.next:
            slow = slow.next
            
            if fast.next != None:
                fast = fast.next.next
            
            if fast == slow:
                return True
            
        return False
