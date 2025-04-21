class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
        capital_heap = [(c, p) for c, p in zip(capital, profits)]
        heapq.heapify(capital_heap)

        profit_heap = []

        for _ in range(k):
            while capital_heap and capital_heap[0][0] <= w:
                c, p = heapq.heappop(capital_heap)
                heapq.heappush(profit_heap, -p)
            
            if not profit_heap:
                break
            
            w += -heapq.heappop(profit_heap)

        return w

