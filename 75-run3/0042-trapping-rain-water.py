class Solution:
    def trap(self, height: List[int]) -> int:
        left  = 0
        right = len(height) - 1

        lMax, rMax = height[left], height[right]

        ironBucket = 0

        while left < right:
            
            if height[left] < height[right]:
                left += 1
                lMax = max(height[left], lMax)
                ironBucket += lMax - height[left]
            else:
                right -= 1
                rMax = max(height[right], rMax)
                ironBucket += rMax - height[right]
        
        return ironBucket
