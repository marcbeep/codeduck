class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []            
        for i in range(len(tokens)):
            match tokens[i]:
                case "+":
                    b = stack.pop()
                    a = stack.pop()
                    stack.append(a + b)
                    # print(f"Token: {tokens[i]} Stack: {stack}")
                case "-":
                    b = stack.pop()
                    a = stack.pop()
                    stack.append(a - b)
                    # print(f"Token: {tokens[i]} Stack: {stack}")
                case "*":
                    b = stack.pop()
                    a = stack.pop()
                    stack.append(a * b)
                    # print(f"Token: {tokens[i]} Stack: {stack}")
                case "/":
                    b = stack.pop()
                    a = stack.pop()
                    stack.append(int(a / b))
                    # print(f"Token: {tokens[i]} Stack: {stack}")
                case _:
                    stack.append(int(tokens[i]))
                    # print(f"Token: {tokens[i]} Stack: {stack}")

        return stack[-1]
                
        
