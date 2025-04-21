class Solution:
    def isHappy(self, n: int) -> bool:
        def getHappy(num):
            sum = 0
            while num > 0:
                digit = num % 10
                sum += digit ** 2
                num //= 10
            return sum

        seen = set()

        while n != 1 and n not in seen:
            seen.add(n)
            n = getHappy(n)

        return n == 1
