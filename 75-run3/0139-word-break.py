class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)  # Convert list to set for O(1) lookup time
        print(wordSet)
        dp = [False] * (len(s) + 1)  # DP array to track breakable points
        print(dp)
        dp[0] = True  # Base case: Empty string can always be segmented
        print(dp)

        for i in range(1, len(s) + 1):
            print(dp)
            for j in range(i):
                if dp[j] and s[j:i]in wordSet:
                    print(f"{dp[j]} and {s[j]} found in wordSet")
                    dp[i] = True
                    break
        
        return dp[len(s)]
