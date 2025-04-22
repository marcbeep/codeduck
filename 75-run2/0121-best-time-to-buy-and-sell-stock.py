class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        acc = float("inf")
        partial_min = [acc := min(acc,x) for x in prices]
        acc = float("-inf")
        partial_max = [acc := max(acc,x) for x in prices[::-1]][::-1]
        return max(maximum - minimum for minimum, maximum in zip(partial_min, partial_max))
