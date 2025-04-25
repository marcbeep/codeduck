class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        freq = Counter(tasks)
        max_freq = max(freq.values())
        max_freq_count = sum(1 for task in freq if freq[task] == max_freq)

        return max(len(tasks), (max_freq - 1) * (n + 1) + max_freq_count)
