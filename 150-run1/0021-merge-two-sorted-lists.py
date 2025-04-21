class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy

        # traverse both lists til one is empty
        while list1 and list2:
            # list2 is more
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                # list1 is more
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        
        # append remaining nodes from list1 or list 2
        tail.next = list1 if list1 else list2

        return dummy.next
