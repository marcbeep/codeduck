# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        currN = head
        prevN = None
        nextN = None
        
        while currN:
            nextN = currN.next
            currN.next = prevN
            prevN = currN
            currN = nextN
        
        return prevN
