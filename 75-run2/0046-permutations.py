class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        output = []

        def backtrack(start, arr):
            if start == len(arr):
                output.append(arr)

            for i in range(start, len(arr)):
                new_arr = arr.copy()

                new_arr[start], new_arr[i] = new_arr[i], new_arr[start]

                backtrack(start+1, new_arr)
        
        backtrack(0, nums)
        return output
