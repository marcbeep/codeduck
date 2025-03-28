class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heads = [head for head in lists]
        output = ListNode(0)
        out_curr = output

        while any(heads):
            idx, min = -1, float('inf')
            for i, head in enumerate(heads):
                if head and head.val < min:
                    out_curr.next = head
                    min = head.val
                    idx = i
            heads[idx] = heads[idx].next
            out_curr = out_curr.next
        
        return output.next
