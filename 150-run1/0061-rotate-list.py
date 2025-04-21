class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or not head.next or k == 0:
            return head
        
        length = 1
        tail = head
        while tail.next:
            tail = tail.next
            length += 1
        
        k = k % length
        if k == 0:
            return head
        
        node = head
        for _ in range(length - k - 1):
            node = node.next
        
        newHead = node.next
        node.next = None
        tail.next = head
        
        return newHead
