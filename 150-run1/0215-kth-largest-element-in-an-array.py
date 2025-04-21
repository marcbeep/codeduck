class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        def quick_select(nums, k):
            pivot = random.choice(nums)
            left, mid, right = [], [], []
            for n in nums:
                if n > pivot:
                    left.append(n)
                elif n == pivot:
                    mid.append(n)
                else:
                    right.append(n)
            if k <= len(left):
                return quick_select(left, k)
            if len(left) + len(mid) < k:
                return quick_select(right, k - len(left) - len(mid))
            return pivot

        return quick_select(nums, k)
