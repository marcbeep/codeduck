class Solution:
    def isValid(self, s: str) -> bool:
        stack = []

        for c in s:
            if c in '([{':
                stack.append(c)
            else:
                if not stack:
                    return False
                leftpar = stack.pop()
                if c == ')' and leftpar != '(':
                    return False
                elif c == ']' and leftpar != '[':
                    return False
                elif c == '}' and leftpar != '{':
                    return False

        return True if not stack else False
