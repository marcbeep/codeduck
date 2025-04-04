class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.strip()
        sign = 1
        currInt = 0

        max = 2147483647
        min = -2147483648

        for i in range(len(s)):
            if i == 0:
                if s[i] == '-':
                    sign = -1
                    continue
                elif s[i] == '+':
                    continue
            
            if s[i] not in '0123456789':
                break
            
            currInt = (currInt * 10) + int(s[i])

        currInt *= sign

        if currInt > max:
            return max
        if currInt < min:
            return min

        return currInt
