class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.val = OrderedDict()
 
    def get(self, key: int) -> int:
        if key in self.val.keys():
            self.val.move_to_end(key)
        
            return self.val[key]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.val.keys() or len(self.val) < self.capacity:
            self.val[key] = value
            self.val.move_to_end(key)
        else:
            self.val.popitem(last = False)
            self.val[key] = value
            self.val.move_to_end(key)

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
