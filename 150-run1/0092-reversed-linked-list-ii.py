class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        if not head or left == right:
            return head

        dummy = ListNode(0, head)
        prev = dummy

        # Move prev to the node before `left`
        for _ in range(left - 1):
            prev = prev.next

        # Reverse the sublist between `left` and `right`
        curr = prev.next
        next_node = None

        for _ in range(right - left):
            next_node = curr.next
            curr.next = next_node.next
            next_node.next = prev.next
            prev.next = next_node

        return dummy.next

