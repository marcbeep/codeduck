class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False  # Empty list or single node (no cycle possible)

        tortoise = head
        hare = head

        while hare and hare.next:
            tortoise = tortoise.next  # Move 1 step
            hare = hare.next.next  # Move 2 steps

            if tortoise == hare:
                return True  # Cycle detected

        return False  # No cycle
