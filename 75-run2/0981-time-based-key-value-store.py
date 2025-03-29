class TimeMap:

    def __init__(self):
        self.store = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Store tuple (timestamp, value) for each key
        self.store[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""

        values = self.store[key]
        # Binary search to find the latest timestamp <= given timestamp
        index = bisect.bisect_right(values, (timestamp, chr(127))) - 1
        
        if index >= 0:
            return values[index][1]
        return ""
