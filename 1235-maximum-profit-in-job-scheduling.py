import bisect

class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        jobs = sorted(zip(startTime, endTime, profit), key=lambda x: x[1])
        dp = [0] * (len(profit) + 1)
        endTimes = [job[1] for job in jobs]
        
        for i in range(1, len(jobs) + 1):
            start, end, prof = jobs[i - 1]
            index = bisect.bisect_right(endTimes, start) - 1
            dp[i] = max(dp[i - 1], dp[index + 1] + prof)
        
        return dp[-1]
