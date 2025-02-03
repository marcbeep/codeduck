# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head or k == 1:
            return head
        
        dummy = ListNode(0)  # Dummy node to simplify head management
        dummy.next = head
        prev_group = dummy  # Pointer to track the previous group's tail
        
        while True:
            # Step 1: Check if there are at least k nodes to reverse
            kth_node = prev_group
            for _ in range(k):
                kth_node = kth_node.next
                if not kth_node:
                    return dummy.next  # Not enough nodes to form a group
            
            # Step 2: Reverse k nodes
            prev, curr = None, prev_group.next
            next_group_head = kth_node.next  # Store the start of the next group
            
            for _ in range(k):
                next_node = curr.next
                curr.next = prev
                prev = curr
                curr = next_node  # Move to the next node
            
            # Step 3: Connect reversed group with previous and next groups
            start_of_reversed_group = prev  # This is the new head of the reversed segment
            end_of_reversed_group = prev_group.next  # This is the old head (now the tail)
            
            prev_group.next = start_of_reversed_group
            end_of_reversed_group.next = next_group_head
            
            # Step 4: Move prev_group to the end of the reversed section
            prev_group = end_of_reversed_group  # Move pointer to the new tail
        
        return dummy.next  # Return new head
