from bisect import bisect_right


class Solution:
    def jobScheduling(self, startTime, endTime, profit):
        # Combine the job info and sort by endTime
        jobs = sorted(zip(startTime, endTime, profit), key=lambda x: x[1])

        # Separate the start, end, and profit for easier handling
        starts = [job[0] for job in jobs]
        ends = [job[1] for job in jobs]
        profits = [job[2] for job in jobs]

        # DP array: list of tuples (endTime, maxProfitUntilThatTime)
        dp = [(0, 0)]  # Initialize with 0 profit at time 0

        for i in range(len(jobs)):
            # Use binary search to find the latest job that doesn't conflict
            idx = bisect_right(dp, (starts[i], float("inf"))) - 1
            currentProfit = dp[idx][1] + profits[i]

            # If currentProfit is better than last dp value, add it
            if currentProfit > dp[-1][1]:
                dp.append((ends[i], currentProfit))

        return dp[-1][1]
