class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        return self.binarySearch(nums, 0, len(nums)-1, target)
    
    def binarySearch(self, nums, low, high, x):
        print(f"nums: {nums}, low: {low}, high: {high}, x: {x}")
        while low <= high:
            mid = low + (high - low) // 2
            print(f"curr mid: {mid}")

            if nums[mid] == x:
                return mid
                
            elif nums[mid] < x:
                low = mid + 1
                
            else:
                high = mid - 1
            
        return low
