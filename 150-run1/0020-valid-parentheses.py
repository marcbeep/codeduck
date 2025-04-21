class Solution:
    def isValid(self, s: str) -> bool:
        dick = {')': '(', ']': '[', '}': '{'}
        stack = []
        for c in s:
            if c in "([{":
                stack.append(c)
            else:
                if not stack:
                    return False
                tmp = stack.pop()
                if dick[c] != tmp:
                    return False
        
        return not stack
