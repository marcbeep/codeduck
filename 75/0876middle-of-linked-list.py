# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        oneStep = head
        twoStep = head

        while twoStep.next:
            if not twoStep.next:
                break
            oneStep = oneStep.next
            twoStep = twoStep.next.next
        
        return oneStep
