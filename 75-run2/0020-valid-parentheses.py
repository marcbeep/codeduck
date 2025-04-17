class Solution:
    def isValid(self, s: str) -> bool:

        stack = []
        closing = {
            "(" : ")",
            "{" : "}",
            "[" : "]"
        }

        for character in s:
            if character in closing:
                stack.append(character)
            else:
                if not stack:
                    return False
                
                x = stack.pop()
                
                if character != closing[x]:
                    return False
        
        return len(stack)==0
