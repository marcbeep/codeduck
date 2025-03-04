class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        pairs = [[float('-inf'), 0]] + [[float('-inf'), 0] for _ in range(k)]

        for day in prices:
            for i in range(1, len(pairs)):
                # buy = max (buy, pricepredecesor_sale - day)
                print(i, i-1)
                pairs[i][0] = max(pairs[i][0], pairs[i-1][1] - day)
                # sell = max (sell, buy + day)
                pairs[i][1] = max(pairs[i][1], pairs[i][0] + day)
                
        # return last sell of pairs
        return pairs[-1][1]
