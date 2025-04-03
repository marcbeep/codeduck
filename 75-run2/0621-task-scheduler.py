class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        cnt = Counter(tasks)
        maxi = max(cnt.values())

        no_of_most_fre_ele = 0

        for key, val in cnt.items():
            if val == maxi:
                no_of_most_fre_ele += 1
        
        return max((n + 1) * (maxi - 1) + no_of_most_fre_ele, len(tasks))
