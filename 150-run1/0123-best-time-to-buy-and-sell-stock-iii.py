class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        firstBuy  = float('-inf')
        firstSell = 0

        secondBuy  = float('-inf')
        secondSell = 0

        for day in prices:
            firstBuy  = max(firstBuy, -day)
            firstSell = max(firstSell, firstBuy + day)

            secondBuy  = max(secondBuy, firstSell - day)
            secondSell = max(secondSell, secondBuy + day)

        return secondSell
