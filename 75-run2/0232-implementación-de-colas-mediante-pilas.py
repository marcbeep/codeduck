class MyQueue:

    def __init__(self):
        self.stack = []
        self.temp = []
        
    def push(self, x: int) -> None:
        self.stack.append(x)
        

    def pop(self) -> int:

        while len(self.stack) > 1:
            x = self.stack.pop()
            self.temp.append(x)

        element = self.stack.pop()

        while self.temp:
            x = self.temp.pop()
            self.stack.append(x)
        
        return element

    def peek(self) -> int:
        return self.stack[0]
        

    def empty(self) -> bool:
        return not self.stack
        


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
