class MyQueue:

    def __init__(self):
        self.stack = []
        self.tmpst = []

    def push(self, x: int) -> None:
        self.stack.append(x)

    def pop(self) -> int:
        while self.stack:
            self.tmpst.append(self.stack.pop())
        out = self.tmpst.pop()
        while self.tmpst:
            self.stack.append(self.tmpst.pop())
        return out

    def peek(self) -> int:
        return self.stack[0]

    def empty(self) -> bool:
        return not self.stack
