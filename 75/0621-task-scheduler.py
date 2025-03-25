class Solution:
    def leastInterval(self, tasks, n):
        task_counts = Counter(tasks)
        max_freq = max(task_counts.values())
        max_count = sum(1 for count in task_counts.values() if count == max_freq)
        
        part_count = max_freq - 1
        part_length = n + 1
        empty_slots = part_count * part_length + max_count
        
        return max(len(tasks), empty_slots)

