from typing import List

class Solution:
    def partition(self, array, low, high):
        pivot = array[high]
        i = low - 1

        for j in range(low, high):
            if array[j] <= pivot:
                i += 1
                array[i], array[j] = array[j], array[i]

        array[i + 1], array[high] = array[high], array[i + 1]
        return i + 1

    def quicksort(self, array, low=0, high=None):
        if high is None:
            high = len(array) - 1

        if low < high:
            pivot_index = self.partition(array, low, high)  # Fixed the assignment
            self.quicksort(array, low, pivot_index - 1)
            self.quicksort(array, pivot_index + 1, high)

    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        self.quicksort(nums)
