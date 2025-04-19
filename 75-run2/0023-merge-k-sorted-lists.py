class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        output = ListNode()
        curr = output
        heads = lists
        while any(head for head in heads):
            idx, m = 0, float('inf')
            for i, head in enumerate(heads):
                if head and head.val < m:
                    idx = i
                    m = head.val
            curr.next = heads[idx]
            curr = curr.next
            heads[idx] = heads[idx].next
        
        return output.next
