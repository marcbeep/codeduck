class Solution:
    def maxArea(self, height: List[int]) -> int:
        a, b = 0, len(height)-1
        maxArea, area = 0, 0
        while a != b:
            if height[a] < height[b]:
                # cal area
                area = min(height[a], height[b]) * (b-a)
                if area>maxArea: 
                    maxArea = area
                a += 1
            else:
                area = min(height[a], height[b]) * (b-a)
                if area>maxArea: 
                    maxArea = area
                b -= 1
        return maxArea
