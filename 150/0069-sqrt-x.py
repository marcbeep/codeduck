class Solution:
    def mySqrt(self, x: int) -> int:
        left, right = 0, x
        mid = 0

        while left <= right:
            mid = left + (right - left) // 2

            if mid*mid == x:
                return mid
            elif mid*mid < x:
                left = mid + 1 # search right 
            else:
                right = mid - 1 # search left

        return mid - 1 if mid*mid > x else mid
