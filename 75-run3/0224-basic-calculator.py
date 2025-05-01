class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        operand = 0
        result = 0
        sign = 1

        for char in s:
            if char.isdigit():
                operand = operand * 10 + int(char)
            elif char == '+':
                result += sign * operand
                sign = 1
                operand = 0
            elif char == '-':
                result += sign * operand
                sign = -1
                operand = 0
            elif char == '(':
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1
            elif char == ')':
                result += sign * operand
                operand = 0
                result *= stack.pop()
                result += stack.pop()

        return result + sign * operand
