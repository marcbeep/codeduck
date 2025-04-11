class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        curr = head
        count = 0
        while curr:
            curr = curr.next
            count += 1
        
        count = count // 2
        curr = head
        for _ in range(count):
            curr = curr.next
        
        return curr
