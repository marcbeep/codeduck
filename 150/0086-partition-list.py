class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        if not head:
            return None

        smallers = ListNode(0)
        others = ListNode(0)
        small_tail, other_tail = smallers, others

        curr = head
        while curr:
            if curr.val < x:
                small_tail.next = curr
                small_tail = small_tail.next
            else:
                other_tail.next = curr
                other_tail = other_tail.next
            curr = curr.next
        
        other_tail.next = None
        small_tail.next = others.next

        return smallers.next
