"""class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next"""

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)  # Dummy node to simplify result list construction
        current = dummy
        carryOver = 0

        while l1 or l2 or carryOver:
            val1 = l1.val if l1 else 0  # Get value from l1, or 0 if l1 is exhausted
            val2 = l2.val if l2 else 0  # Get value from l2, or 0 if l2 is exhausted

            total = val1 + val2 + carryOver
            carryOver = total // 10  # Extract carry
            digit = total % 10  # Extract last digit

            current.next = ListNode(digit)  # Append new digit node
            current = current.next  # Move pointer forward

            if l1: l1 = l1.next  # Move to next node in l1
            if l2: l2 = l2.next  # Move to next node in l2

        return dummy.next  # Return result, skipping the dummy node
