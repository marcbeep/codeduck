# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        def rec(a, b):
            if a >= b:
                return a

            mid = a + (b - a) // 2
            if isBadVersion(mid):
                return rec(a, mid)
            else:
                return rec(mid + 1, b)
        
        return rec(1, n)
