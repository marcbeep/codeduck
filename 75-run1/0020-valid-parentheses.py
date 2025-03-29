class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        dick = {
            ")": "(",
            "}": "{",
            "]": "["
        }
        
        for bracket in s:
            if bracket in dick:
                if stack and stack[-1] == dick[bracket]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(bracket)

        return len(stack) == 0
