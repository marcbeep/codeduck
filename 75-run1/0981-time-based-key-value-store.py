class TimeMap:

    def __init__(self):
        self.dataStore = defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.dataStore[key].append((timestamp, value))  # Store (timestamp, value)

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.dataStore:
            return ""

        arr = self.dataStore[key]
        idx = bisect.bisect_right(arr, (timestamp,)) - 1  # Find largest timestamp ≤ given timestamp

        return arr[idx][1] if idx >= 0 else ""
