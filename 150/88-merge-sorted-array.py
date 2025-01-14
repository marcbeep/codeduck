class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """
        i = m + n - 1
        j = n - 1
        k = m - 1

        # Merge nums1 and nums2
        while j >= 0:  # Process all elements of nums2
            if k >= 0 and nums1[k] > nums2[j]:  # If nums1 element is greater
                nums1[i] = nums1[k]
                k -= 1
            else:  # If nums2 element is greater or nums1 is exhausted
                nums1[i] = nums2[j]
                j -= 1
            i -= 1
