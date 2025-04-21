from typing import List

def coinChange(coins: List[int], amount: int) -> int:
    # Initialize the DP array with a default value of amount + 1
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0  # base case: 0 coins needed to make amount 0

    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] if dp[amount] != amount + 1 else -1
