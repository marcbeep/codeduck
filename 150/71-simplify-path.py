class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        s = path.split('/')
        
        for part in s:
            if part == '' or part == '.':  # Ignore empty parts and '.'
                continue
            elif part == '..':  # Go one directory up
                if stack:
                    stack.pop()
            else:
                stack.append(part)  # Add valid directory names
        
        return '/' + '/'.join(stack)  # Construct the canonical path
