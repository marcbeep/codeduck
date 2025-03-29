class Solution:
    def myAtoi(self, s: str) -> int:
        sign = 1
        output = 0

        idx = 0
        while idx < len(s) and s[idx] == ' ':
            idx += 1
        
        if idx >= len(s):
            return output

        if s[idx] == '-':
            sign = -1
            idx += 1
        elif s[idx] == '+':
            idx += 1

        while idx < len(s) and s[idx] in '0123456789':
            output *= 10
            output += int(s[idx])
            idx += 1

        output *= sign
        if output > (2**31) - 1:
            output = 2**31 - 1
        elif output < -(2**31):
            output = -(2**31)

        return output
