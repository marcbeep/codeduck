class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        calstack = [] 
        top = 0
        bottom = 0
        result = 0

        for i in range(len(tokens)):
            if tokens[i] not in '+-*/':
                calstack.append(tokens[i])
            else:
                top = int(calstack.pop())
                bottom = int(calstack.pop())
                match tokens[i]:
                    case '+':
                        result = bottom + top
                    case '-':
                        result = bottom - top
                    case '*':
                        result = bottom * top
                    case '/':
                        result = bottom / top
                calstack.append(result)

        
        return int(calstack.pop())
