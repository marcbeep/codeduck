class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        result = 0
        sign = 1
        
        for i, char in enumerate(s):
            if char.isdigit():
                num = num * 10 + int(char)
                
            if char in "+-" or char == ")" or i == len(s) - 1:
                result += sign * num
                num = 0
                
            if char == "+":
                sign = 1
            elif char == "-":
                sign = -1
            elif char == "(":
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1
            elif char == ")":
                result += stack.pop() * result
                result += stack.pop()
        
        return result
