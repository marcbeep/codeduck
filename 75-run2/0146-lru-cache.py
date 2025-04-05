class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.maphash = {}
        self.queue = []

    def get(self, key: int) -> int:
        if key not in self.maphash:
            return -1
        
        self.queue.remove(key)
        self.queue.insert(0, key)
        return self.maphash[key]

    def put(self, key: int, value: int) -> None:
        if key in self.maphash:
            self.queue.remove(key)
        elif len(self.maphash) >= self.capacity:
            lru = self.queue.pop()
            del self.maphash[lru]
        
        self.queue.insert(0, key)
        self.maphash[key] = value
